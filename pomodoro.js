// =======================POMODORO SECTION==================================
const defaultTime = 25;

const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
let isRunning = false;
let pomodoroTime = defaultTime;
let countdown;

// Moved all function declarations to the top
function updateButtonText(index, isPlaying) {
  buttons[index].textContent = isPlaying
    ? `Pause ${index + 1}`
    : `Sound ${index + 1}`;
}

function displayTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remSeconds = seconds % 60;
  document.getElementById("timer-display").textContent = `${minutes}:${
    remSeconds < 10 ? "0" : ""
  }${remSeconds}`;
}

startBtn.addEventListener("click", function () {
  // Toggle the running state
  isRunning = !isRunning;

  // Update the start button text
  startBtn.textContent = isRunning ? "Pause" : "Start";

  // Start or pause the timer
  if (isRunning) {
    // Convert pomodoroTime from minutes to seconds
    let timeInSeconds = pomodoroTime * 60;

    // Start the countdown
    countdown = setInterval(function () {
      timeInSeconds--;
      displayTime(timeInSeconds);
    
      if (timeInSeconds <= 0) {
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = 'Start';
        pomodoroTime = defaultTime;
        displayTime(pomodoroTime * 60);
      }
    }, 1000);
  } else {
    // Pause the countdown
    clearInterval(countdown);
  }
});

increaseBtn.addEventListener("click", function () {
  // Remember if the timer was running
  let wasRunning = isRunning;

  // Stop the timer
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";
  }

  // Increase the timer by one minute
  pomodoroTime += 1;

  // Update the timer display
  displayTime(pomodoroTime * 60); // Display the time in seconds

  // Restart the timer if it was running
  if (wasRunning) {
    startBtn.click();
  }
});

decreaseBtn.addEventListener("click", function () {
  // Remember if the timer was running
  let wasRunning = isRunning;

  // Stop the timer
  if (isRunning) {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";
  }

  // Decrease the timer by one minute, but don't go below 1 minute
  if (pomodoroTime > 1) {
    pomodoroTime -= 1;
  }

  // Update the timer display
  displayTime(pomodoroTime * 60); // Display the time in seconds

  // Restart the timer if it was running
  if (wasRunning) {
    startBtn.click();
  }
});

resetBtn.addEventListener("click", function () {
  // Stop the timer
  clearInterval(countdown);
  isRunning = false;
  startBtn.textContent = "Start";

  // Reset the timer to the default time
  pomodoroTime = defaultTime;

  // Update the timer display
  displayTime(pomodoroTime * 60); // Display the time in seconds
});

chrome.runtime.sendMessage({ action: "getState" }, (response) => {
  response.playing.forEach((isPlaying, index) => {
    updateButtonText(index, isPlaying);
  });
});
