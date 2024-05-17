const buttons = [
  document.getElementById('sound1'),
  document.getElementById('sound2'),
  document.getElementById('sound3'),
  document.getElementById('sound4')
];

let playing = [false, false, false, false];

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (playing[index]) {
      chrome.runtime.sendMessage({ action: 'pause', index });
      button.textContent = `Sound ${index + 1}`;
    } else {
      chrome.runtime.sendMessage({ action: 'play', index });
      button.textContent = `Pause ${index + 1}`;
    }
    playing[index] = !playing[index];
  });
});
