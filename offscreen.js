let audioElements = [];

const audioFiles = [
  'sounds/sound1.mp3',
  'sounds/sound2.mp3',
  'sounds/sound3.mp3',
  'sounds/sound4.mp3'
];

audioFiles.forEach((file, index) => {
  const audio = new Audio(file);
  audio.loop = true;
  audioElements[index] = audio;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'play') {
    audioElements[index].play();
  } else if (action === 'pause') {
    audioElements[index].pause();
  }
}); 