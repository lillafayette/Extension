let playing = [false, false, false, false];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'toggle') {
    playing[index] = !playing[index];
    sendResponse({ playing: playing[index] });
  } else if (action === 'getState') {
    sendResponse({ playing });
  }
});