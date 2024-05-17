const audioFiles = [
  'sounds/sound1.mp3',
  'sounds/sound2.mp3',
  'sounds/sound3.mp3',
  'sounds/sound4.mp3'
];

const audioElements = audioFiles.map(file => {
  const audio = new Audio(chrome.runtime.getURL(file));
  audio.loop = true;
  return audio;
});

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
    if (isPlaying) {
      audioElements[index].play();
    }
    updateButtonText(index, isPlaying);
  });
});

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggle', index }, response => {
      const isPlaying = response.playing;
      if (isPlaying) {
        audioElements[index].play();
      } else {
        audioElements[index].pause();
      }
      updateButtonText(index, isPlaying);
    });
  });
});