let playing = [false, false, false, false];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, index } = message;

  if (action === 'toggle') {
    playing[index] = !playing[index];
    if (playing[index]) {
      chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Play background audio'
      }, () => {
        chrome.runtime.sendMessage({ action: 'play', index });
      });
    } else {
      chrome.runtime.sendMessage({ action: 'pause', index });
    }
    sendResponse({ playing: playing[index] });
  } else if (action === 'getState') {
    sendResponse({ playing });
  }
});