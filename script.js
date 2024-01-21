const timeEle = document.getElementById("time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapTimesContainer = document.getElementById("lapTimes");

let startTime = 0;
let diffrence = 0;
let timerInterval;
let lapTimes = [];
let isTimerRunning = false;

function startTimer() {
  startTime = Date.now() - diffrence;

  timerInterval = setInterval(() => {
    diffrence = Date.now() - startTime;
    timeEle.textContent = formatTime(diffrence);
  }, 10);
  isTimerRunning = true;
}
startBtn.addEventListener("click", function () {
  startTimer();
});

stopBtn.addEventListener("click", function () {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    stopBtn.textContent = "Resume";
  } else {
    stopBtn.textContent = "Stop";
    startTimer();
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerInterval);

  diffrence = 0;
  timeEle.textContent = "00:00:00:00";
  lapTimes = [];

  updateLapTimes();
  isTimerRunning = false;
});

lapBtn.addEventListener("click", function () {
  const currentLapTime = diffrence;
  lapTimes.push(currentLapTime);
  updateLapTimes();
});

function formatTime(diffrence) {
  const milliseconds = Math.floor((diffrence % 1000) / 10);
  const seconds = Math.floor((diffrence % (1000 * 60)) / 1000);
  const minutes = Math.floor((diffrence % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(diffrence / (1000 * 60 * 60));
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    ":" +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}

function updateLapTimes() {
  lapTimesContainer.innerHTML = "";

  lapTimes.forEach((lap, index) => {
    const lapTimeElement = document.createElement("h3");
    lapTimeElement.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
    lapTimesContainer.appendChild(lapTimeElement);
  });
}
