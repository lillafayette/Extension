const NUM_SOUNDS = 4;
const buttons = Array.from({ length: NUM_SOUNDS }, (_, i) => document.getElementById(`sound${i + 1}`));
const mainVolumeSlider = document.getElementById("mainVolume");

function updateButtonText(index, isPlaying) {
  buttons[index].textContent = isPlaying ? `Pause ${index + 1}` : `Sound ${index + 1}`;
}

chrome.runtime.sendMessage({ action: "getState" }, (response) => {
  response.playing.forEach((isPlaying, index) => {
    updateButtonText(index, isPlaying);
  });
});

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggle", index }, (response) => {
      updateButtonText(index, response.playing);
    });
  });
});

mainVolumeSlider.addEventListener("input", () => {
  const mainVolume = mainVolumeSlider.value / 100;
  chrome.runtime.sendMessage({ action: "setMainVolume", mainVolume }, () => {
    chrome.storage.local.set({ mainVolume });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["mainVolume"], (result) => {
    if (result.mainVolume !== undefined) {
      mainVolumeSlider.value = result.mainVolume * 100;
      chrome.runtime.sendMessage({ action: "setMainVolume", mainVolume: result.mainVolume });
    }
  });
});
