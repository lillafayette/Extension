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

// nasłuchiwacze kliknięcia na przycisk, które wysyłają informację do background.js z żadaniem wyłączenia lub włączenia dźwięku i aktualizują tekst na przyciskus
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggle', index }, response => {
      const isPlaying = response.playing;
      updateButtonText(index, isPlaying);
    });
  });
});