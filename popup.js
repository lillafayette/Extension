const buttons = [
  document.getElementById('sound1'),
  document.getElementById('sound2'),
  document.getElementById('sound3'),
  document.getElementById('sound4')
];

// funkcja do aktualizacji tekstu na przyciskach
function updateButtonText(index, isPlaying) {
  buttons[index].textContent = isPlaying ? `Pause ${index + 1}` : `Sound ${index + 1}`;
}

// wysyłanie informacji do background.js w celu uzyskania stanu odtwarzania dźwięków
chrome.runtime.sendMessage({ action: 'getState' }, response => {
  response.playing.forEach((isPlaying, index) => {
    updateButtonText(index, isPlaying);
  });
});

// nasłuchiwanie kliknięcia na przycisk, które wysyłają informację do background.js z żadaniem wyłączenia lub włączenia dźwięku i aktualizują tekst na przyciskus
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggle', index }, response => {
      const isPlaying = response.playing;
      updateButtonText(index, isPlaying);
    });
  });
});




document.getElementById('toggle-bold').addEventListener('change', (event) => {
  const isChecked = event.target.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: '(' + toggleBold.toString() + ')(' + isChecked + ');' }
    );
  });
});

function toggleBold(isChecked) {
  function bionicReading(text) {
    return text.replace(/\b([\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)\b/g, (match) => {
      const midIndex = Math.ceil(match.length / 2);
      return '<b>' + match.slice(0, midIndex) + '</b>' + match.slice(midIndex);
    });
  }

  const BOLD_CLASS = 'bolded-text';

  if (isChecked) {
    $('*').contents().filter(function() {
      return this.nodeType === 3 && $.trim(this.nodeValue).length;
    }).each(function() {
      const text = this.nodeValue;
      const newHTML = bionicReading(text);
      const tempSpan = $('<span>').addClass(BOLD_CLASS).html(newHTML);
      $(this).replaceWith(tempSpan);
    });
  } else {
    $(`.${BOLD_CLASS}`).each(function() {
      $(this).replaceWith($(this).text());
    });
  }
}

