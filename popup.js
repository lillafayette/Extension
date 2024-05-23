const buttons = [
  document.getElementById("sound1"),
  document.getElementById("sound2"),
  document.getElementById("sound3"),
  document.getElementById("sound4"),
]
const sliders = [
  document.getElementById("volume1"),
  document.getElementById("volume2"),
  document.getElementById("volume3"),
  document.getElementById("volume4"),
]
// Function to update button text
function updateButtonText(index, isPlaying) {
  buttons[index].textContent = isPlaying
    ? `Pause ${index + 1}`
    : `Sound ${index + 1}`
}
// Retrieve the state and volume from the background script
chrome.runtime.sendMessage({ action: "getState" }, (response) => {
  response.playing.forEach((isPlaying, index) => {
    updateButtonText(index, isPlaying)
    sliders[index].value = response.volumes[index] * 100
    // Update slider with volume value
  })
}) // Add event listeners to buttons
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggle", index }, (response) => {
      const isPlaying = response.playing
      updateButtonText(index, isPlaying)
    })
  })
}) // Add event listeners to sliders
sliders.forEach((slider, index) => {
  slider.addEventListener("input", () => {
    const volume = slider.value / 100
    chrome.runtime.sendMessage({ action: "setVolume", index, volume }, () => {
      chrome.storage.local.set({ [`volume${index}`]: volume })
    })
  })
}) // Restore volume settings from local storage
document.addEventListener("DOMContentLoaded", () => {
  sliders.forEach((slider, index) => {
    chrome.storage.local.get([`volume${index}`], (result) => {
      if (result[`volume${index}`] !== undefined) {
        slider.value = result[`volume${index}`] * 100
        chrome.runtime.sendMessage({
          action: "setVolume",
          index,
          volume: result[`volume${index}`],
        })
      }
    })
  })
})