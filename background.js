let audioTabs = [];
let playing = [false, false, false, false];

const audioFiles = [
  'sounds/sound1.mp3',
  'sounds/sound2.mp3',
  'sounds/sound3.mp3',
  'sounds/sound4.mp3'
];

// Tworzenie ukrytej zakładki do odtwarzania dźwięków
function createAudioTab(index) {
  chrome.tabs.create({ url: 'audio.html', active: false }, (tab) => {
    audioTabs[index] = tab.id;
    chrome.tabs.executeScript(tab.id, {
      code: `
        const audio = new Audio('${chrome.runtime.getURL(audioFiles[index])}');
        audio.loop = true;
        audio.id = 'audio-${index}';
        document.body.appendChild(audio);
        audio.play();
      `
    });
  });
}

// Pauza ukrytej zakładki
function pauseAudioTab(index) {
  chrome.tabs.executeScript(audioTabs[index], {
    code: `
      const audio = document.getElementById('audio-${index}');
      if (audio) {
        audio.pause();
      }
    `
  });
}

// Usunięcie ukrytej zakładki
function removeAudioTab(index) {
  chrome.tabs.remove(audioTabs[index]);
  audioTabs[index] = null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'toggle') {
    playing[index] = !playing[index];
    if (playing[index]) {
      createAudioTab(index);
    } else {
      pauseAudioTab(index);
      removeAudioTab(index);
    }
    sendResponse({ playing: playing[index] });
  } else if (action === 'getState') {
    sendResponse({ playing });
  }
});