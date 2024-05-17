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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'play') {
    audioElements[index].play();
  } else if (action === 'pause') {
    audioElements[index].pause();
  }
});
