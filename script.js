let displayMinutes = document.getElementById("display-minutes");
let displaySeconds = document.getElementById("display-seconds");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const setButton = document.getElementById("set-button");
const stopButton = document.getElementById("stop-button");
const plusButton = document.getElementById("plus-button");
const minusButton = document.getElementById("minus-button");
// let minutes = Number(displayMinutes.textContent);
// let seconds = Number(displaySeconds.textContent);
let newMinutes;

let cards = document.querySelectorAll(".sound-selector button");
let forestCard = document.querySelector(".forest-card");
const rainCard = document.querySelector(".rain-card");
const coffeeCard = document.querySelector(".coffee-card");
const fireCard = document.querySelector(".fire-card");

//funçoes seletor de som

const setActiveButton = (e) => {
  let currentCard = e.target;

  if (currentCard.classList.contains("active")) {
    currentCard.classList.remove("active");
    return;
  }

  for (const card of cards) {
    card.classList.remove("active");
  }

  currentCard.classList.add("active");
};

const handleCardClick = (e) => {
  setActiveButton(e);
};

//funçoes timer

const updateTimerDisplay = (newMinutes, seconds) => {
  displayMinutes.textContent = String(newMinutes).padStart(2, "0");
  displaySeconds.textContent = String(seconds).padStart(2, "0");
};

const resetControls = () => {
  stopButton.classList.add("hide");
  setButton.classList.remove("hide");
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

const handlePlayClick = () => {
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
  setButton.classList.add("hide");
  stopButton.classList.remove("hide");
  countdown();
};

const handlePauseClick = () => {
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
  clearTimeout(countdownTimeOut);
};

const handleSetClick = () => {
  newMinutes = prompt("Quantos minutos?") || 0;

  newMinutes = newMinutes === undefined ? 0 : newMinutes;
  seconds = seconds === undefined ? 0 : seconds;

  updateTimerDisplay(newMinutes, 0);
};

const handleStopClick = () => {
  resetControls();
  resetTimer();
};

const handlePlusClick = (minutes, seconds) => {
  if (playButton.classList.contains("hide")) {
    updateTimerDisplay(Number(minutes + 5), seconds);
  } else {
    updateTimerDisplay(Number(minutes + 5), 0);
  }
};

const handleMinusClick = (minutes, seconds) => {
  if (Number(minutes - 5) >= 0) {
    if (playButton.classList.contains("hide")) {
      updateTimerDisplay(Number(minutes - 5), seconds);
    } else {
      updateTimerDisplay(Number(minutes - 5), 0);
    }
  } else {
    updateTimerDisplay(0, 0);
  }
};

const resetTimer = () => {
  clearTimeout(countdownTimeOut);
  updateTimerDisplay(newMinutes, 0);
};

const countdown = () => {
  minutes = Number(displayMinutes.textContent);
  seconds = Number(displaySeconds.textContent);
  countdownTimeOut = setTimeout(function () {
    if (minutes <= 0 && seconds <= 0) {
      resetControls();
      updateTimerDisplay(newMinutes, seconds);
      clearTimeout(countdownTimeOut);
      return;
    }

    if (seconds <= 0) {
      seconds = 3;
      --minutes;
    }

    updateTimerDisplay(minutes, seconds - 1);

    countdown();
  }, 1000);
};

//eventos timer
playButton.addEventListener("click", handlePlayClick);
pauseButton.addEventListener("click", handlePauseClick);
setButton.addEventListener("click", handleSetClick);
stopButton.addEventListener("click", handleStopClick);
plusButton.onclick = () =>
  handlePlusClick(Number(displayMinutes.textContent), seconds);
minusButton.onclick = () =>
  handleMinusClick(Number(displayMinutes.textContent), seconds);

//eventos sound selector

forestCard.onclick = (e) => setActiveButton(e);
rainCard.onclick = (e) => setActiveButton(e);
fireCard.onclick = (e) => setActiveButton(e);
coffeeCard.onclick = (e) => setActiveButton(e);