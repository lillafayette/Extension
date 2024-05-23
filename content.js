let boldEnabled = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleBold') {
    boldEnabled = !boldEnabled;
    if (boldEnabled) {
      boldFirstTwoCharacters();
    } else {
      removeBold();
    }
  }
});

function boldFirstTwoCharacters() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;

  while (node = walker.nextNode()) {
    const parent = node.parentNode;
    if (parent && parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE' && parent.nodeName !== 'NOSCRIPT') {
      const text = node.nodeValue;
      const newText = text.replace(/\b(\w{2})(\w*)/g, '<b>$1</b>$2');
      const newElement = document.createElement('span');
      newElement.innerHTML = newText;
      parent.replaceChild(newElement, node);
    }
  }
}

function removeBold() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
  let node;

  while (node = walker.nextNode()) {
    if (node.nodeName === 'B') {
      const parent = node.parentNode;
      const textNode = document.createTextNode(node.textContent);
      parent.replaceChild(textNode, node);
    }
  }
}
