Wtyczka Odtwarzania Audio
23 maja 2024
napisz wtyczkę która odtwarza 4 różne dźwięki w formacie mp3, które mogą być uruchamiane równocześnie, dodaj też możliwość korzystania z sliderów w celu modyfikowania tych dźwięków. napisz dwie wersje kodu w manifest2 i manifest3
ChatGPT
Oczywiście! Poniżej znajdziesz przykładowy kod dla wtyczki w formatach manifest v2 i manifest v3. Wtyczka pozwala na odtwarzanie czterech różnych dźwięków w formacie mp3, które mogą być uruchamiane jednocześnie, oraz posiada suwaki do modyfikowania głośności i szybkości odtwarzania.

Manifest v2
manifest.json

json
Skopiuj kod
{
  "manifest_version": 2,
  "name": "Audio Player Extension",
  "version": "1.0",
  "description": "A Chrome extension that plays 4 different mp3 sounds simultaneously with sliders to adjust volume and playback rate.",
  "permissions": ["activeTab"],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  }
}
popup.html

html
Skopiuj kod
<!DOCTYPE html>
<html>
<head>
  <title>Audio Player</title>
  <style>
    .player {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="player">
    <audio id="audio1" src="sound1.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume1" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate1" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio2" src="sound2.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume2" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate2" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio3" src="sound3.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume3" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate3" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio4" src="sound4.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume4" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate4" min="0.5" max="2" step="0.1">
  </div>

  <script src="popup.js"></script>
</body>
</html>
popup.js

javascript
Skopiuj kod
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
Manifest v3
manifest.json

json
Skopiuj kod
{
  "manifest_version": 3,
  "name": "Audio Player Extension",
  "version": "1.0",
  "description": "A Chrome extension that plays 4 different mp3 sounds simultaneously with sliders to adjust volume and playback rate.",
  "permissions": ["activeTab"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  }
}
popup.html

html
Skopiuj kod
<!DOCTYPE html>
<html>
<head>
  <title>Audio Player</title>
  <style>
    .player {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="player">
    <audio id="audio1" src="sound1.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume1" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate1" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio2" src="sound2.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume2" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate2" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio3" src="sound3.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume3" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate3" min="0.5" max="2" step="0.1">
  </div>
  <div class="player">
    <audio id="audio4" src="sound4.mp3" controls></audio>
    <br>
    Volume: <input type="range" id="volume4" min="0" max="1" step="0.01">
    <br>
    Playback Rate: <input type="range" id="rate4" min="0.5" max="2" step="0.1">
  </div>

  <script src="popup.js"></script>
</body>
</html>
popup.js

javascript
Skopiuj kod
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
W obu przypadkach kod HTML, CSS i JavaScript jest identyczny, jedyna różnica to struktura manifestu. Pamiętaj, aby dodać odpowiednie pliki dźwiękowe (sound1.mp3, sound2.mp3, sound3.mp3, sound4.mp3) oraz ikony (icon16.png, icon48.png, icon128.png) do katalogu wtyczki.