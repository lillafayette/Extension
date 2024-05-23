document.addEventListener('DOMContentLoaded', function () {
  const audioElements = [
    {audio: document.getElementById('audio1'), volume: document.getElementById('volume1'), rate: document.getElementById('rate1')},
    {audio: document.getElementById('audio2'), volume: document.getElementById('volume2'), rate: document.getElementById('rate2')},
    {audio: document.getElementById('audio3'), volume: document.getElementById('volume3'), rate: document.getElementById('rate3')},
    {audio: document.getElementById('audio4'), volume: document.getElementById('volume4'), rate: document.getElementById('rate4')}
  ];

  audioElements.forEach(({audio, volume, rate}) => {
    volume.addEventListener('input', () => {
      audio.volume = volume.value;
    });
    rate.addEventListener('input', () => {
      audio.playbackRate = rate.value;
    });
  });
});
