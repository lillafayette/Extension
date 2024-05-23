// Assume you have an array of song names and an array of corresponding audio file URLs
const songs = ['Song 1', 'Song 2', 'Song 3', 'Song 4'];
const audioFiles = ['path/to/song1.mp3', 'path/to/song2.mp3', 'path/to/song3.mp3', 'path/to/song4.mp3'];

// Get the songList element
const songListElement = document.getElementById('songList');

// Create a list item, an Audio object, and a volume control for each song
const audios = songs.map((song, index) => {
    const li = document.createElement('li');
    li.textContent = song;
    songListElement.appendChild(li);

    const audio = new Audio(audioFiles[index]);

    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.min = 0;
    volumeControl.max = 1;
    volumeControl.step = 0.01;
    volumeControl.value = localStorage.getItem(`volume${index}`) || 1;
    li.appendChild(volumeControl);

    audio.volume = volumeControl.value;

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value;
        localStorage.setItem(`volume${index}`, volumeControl.value);
    });

    li.addEventListener('click', () => {
        // If this song is already playing, pause it
        if (!audio.paused) {
            audio.pause();
            li.classList.remove('playing');
        } else {
            // Otherwise, stop all other songs and play this one
            audios.forEach((otherAudio, otherIndex) => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                    songListElement.children[otherIndex].classList.remove('playing');
                }
            });
            audio.play();
            li.classList.add('playing');
        }
    });

    return audio;
});

// Get the master volume control and mute button
const masterVolumeControl = document.getElementById('masterVolume');
const muteButton = document.getElementById('muteButton');

// Load the saved master volume setting
masterVolumeControl.value = localStorage.getItem('masterVolume') || 1;

// Update the volume of all audios when the master volume control changes
masterVolumeControl.addEventListener('input', () => {
    const masterVolume = masterVolumeControl.value;
    audios.forEach(audio => {
        audio.volume = masterVolume;
    });
    localStorage.setItem('masterVolume', masterVolume);
});

// Mute or unmute all audios when the mute button is clicked
muteButton.addEventListener('click', () => {
    if (muteButton.textContent === 'Mute') {
        audios.forEach(audio => {
            audio.muted = true;
        });
        muteButton.textContent = 'Unmute';
    } else {
        audios.forEach(audio => {
            audio.muted = false;
        });
        muteButton.textContent = 'Mute';
    }
});
