// pomodoro.js
let isRunning = false;
let isBreak = false;
let timer;

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        let duration = parseInt(document.getElementById('duration').value) * 60;
        let elapsed = 0;
        timer = setInterval(function() {
            if (elapsed < duration) {
                elapsed++;
                let minutes = Math.floor((duration - elapsed) / 60);
                let seconds = (duration - elapsed) % 60;
                document.getElementById('timerText').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Change this line
                document.getElementById('timerProgress').style.width = `${(elapsed / duration) * 100}%`;
            } else {
                clearInterval(timer);
                isBreak = !isBreak;
                document.getElementById('timerText').textContent = isBreak ? 'Break time!' : 'Work time!'; // Change this line
                document.getElementById('timerProgress').style.width = '0%';
                startPauseTimer();
            }
        }, 1000);
        isRunning = true;
    }
}

document.getElementById('startPause').addEventListener('click', startPauseTimer);
