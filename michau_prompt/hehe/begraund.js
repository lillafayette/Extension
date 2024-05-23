let soundStates = [false, false, false, false]; // Array to track if each sound is playing
let soundVolumes = [0.5, 0.5, 0.5, 0.5]; // Array to track volumes of each sound

// Initialize volumes from storage
chrome.storage.local.get(['volume0', 'volume1', 'volume2', 'volume3'], result => {
  for (let i = 0; i < soundVolumes.length; i++) {
    if (result[`volume${i}`] !== undefined) {
      soundVolumes[i] = result[`volume${i}`];
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getState') {
    sendResponse({ playing: soundStates, volumes: soundVolumes });
  } else if (request.action === 'toggle') {
    const index = request.index;
    soundStates[index] = !soundStates[index];
    // Logic to play/pause the sound
    sendResponse({ playing: soundStates[index] });
  } else if (request.action === 'setVolume') {
    const index = request.index;
    const volume = request.volume;
    soundVolumes[index] = volume;
    // Logic to set volume of the sound
  }
});
