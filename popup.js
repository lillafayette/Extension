const buttons = [
  document.getElementById('sound1'),
  document.getElementById('sound2'),
  document.getElementById('sound3'),
  document.getElementById('sound4')
];

function updateButtonText(index, isPlaying) {
  buttons[index].textContent = isPlaying ? `Pause ${index + 1}` : `Sound ${index + 1}`;
}

chrome.runtime.sendMessage({ action: 'getState' }, response => {
  response.playing.forEach((isPlaying, index) => {
    updateButtonText(index, isPlaying);
  });
});

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggle', index }, response => {
      const isPlaying = response.playing;
      updateButtonText(index, isPlaying);
    });
  });
});