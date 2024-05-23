const NUM_SOUNDS = 4;
let soundStates = Array(NUM_SOUNDS).fill(false);
let mainVolume = 0.5;

const audioFiles = Array.from({length: NUM_SOUNDS}, (_, i) => `sounds/sound${i+1}.mp3`);
const audios = audioFiles.map((file, index) => {
  const audio = new Audio(chrome.runtime.getURL(file));
  audio.loop = true;
  return audio;
});

function updateAudioVolumes() {
  audios.forEach((audio) => {
    audio.volume = mainVolume;
  });
}

chrome.storage.local.get("mainVolume", (result) => {
  if (result.mainVolume !== undefined) {
    mainVolume = result.mainVolume;
    updateAudioVolumes();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, index } = request;
  switch (action) {
    case "getState":
      sendResponse({ playing: soundStates, mainVolume });
      break;
    case "toggle":
      soundStates[index] = !soundStates[index];
      soundStates[index] ? audios[index].play() : audios[index].pause();
      sendResponse({ playing: soundStates[index] });
      break;
    case "setMainVolume":
      mainVolume = request.mainVolume;
      updateAudioVolumes();
      chrome.storage.local.set({ mainVolume });
      sendResponse({ mainVolume });
      break;
  }
});

// Get the buttons
const muteButton = document.getElementById("muteButton");
const playAllButton = document.getElementById("playAllButton");
const stopAllButton = document.getElementById("stopAllButton");

// Add event listeners
muteButton.addEventListener("click", () => {
  mainVolume = 0;
  updateAudioVolumes();
});

playAllButton.addEventListener("click", () => {
  soundStates.fill(true);
  audios.forEach(audio => audio.play());
});

stopAllButton.addEventListener("click", () => {
  soundStates.fill(false);
  audios.forEach(audio => audio.pause());
});
