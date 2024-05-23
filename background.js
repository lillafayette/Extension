let soundStates = [false, false, false, false]
// Array to track if each sound is playing
let soundVolumes = [0.5, 0.5, 0.5, 0.5]
// Array to track volumes of each sound
const audioFiles = [
  "sounds/sound1.mp3",
  "sounds/sound2.mp3",
  "sounds/sound3.mp3",
  "sounds/sound4.mp3",
]
const audios = audioFiles.map((file) => {
  const audio = new Audio(chrome.runtime.getURL(file))
  audio.loop = true
  return audio
})
// Initialize volumes from storage
chrome.storage.local.get(
  ["volume0", "volume1", "volume2", "volume3"],
  (result) => {
    for (let i = 0; i < soundVolumes.length; i++) {
      if (result[`volume${i}`] !== undefined) {
        soundVolumes[i] = result[`volume${i}`]
        audios[i].volume = soundVolumes[i]
      }
    }
  },
)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getState") {
    sendResponse({ playing: soundStates, volumes: soundVolumes })
  } else if (request.action === "toggle") {
    const index = request.index
    soundStates[index] = !soundStates[index]
    if (soundStates[index]) {
      audios[index].play()
    } else {
      audios[index].pause()
    }
    sendResponse({ playing: soundStates[index] })
  } else if (request.action === "setVolume") {
    const index = request.index
    const volume = request.volume
    soundVolumes[index] = volume
    audios[index].volume = volume
    chrome.storage.local.set({ [`volume${index}`]: volume })
    sendResponse({ volume: soundVolumes[index] })
  }
})