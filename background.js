let audioElements = [];
let playing = [false, false, false, false];

const audioFiles = [
  'sounds/sound1.mp3',
  'sounds/sound2.mp3',
  'sounds/sound3.mp3',
  'sounds/sound4.mp3'
];

// Tworzenie obiektów audio i ustawienie ich na zapętlenie
audioFiles.forEach((file, index) => {
  const audio = new Audio(chrome.runtime.getURL(file));
  audio.loop = true;
  audioElements[index] = audio;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'toggle') {
    playing[index] = !playing[index];
    if (playing[index]) {
      audioElements[index].play();
    } else {
      audioElements[index].pause();
    }
    sendResponse({ playing: playing[index] });
  } else if (action === 'getState') {
    sendResponse({ playing });
  }
});