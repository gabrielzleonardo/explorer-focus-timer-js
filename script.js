import Sounds from "./components/Sounds.js";

let displayMinutes = document.getElementById("display-minutes");
let displaySeconds = document.getElementById("display-seconds");
let minutes = Number(displayMinutes.textContent);
let seconds = Number(displaySeconds.textContent);
let countdownTimeOut;
let newMinutes = 25;
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const setButton = document.getElementById("set-button");
const stopButton = document.getElementById("stop-button");
const plusButton = document.getElementById("plus-button");
const minusButton = document.getElementById("minus-button");
const stopMusicButton = document.querySelector(".stop-music");

let cards = document.querySelectorAll(".sound-selector button");
let forestCard = document.querySelector(".forest-card");
const rainCard = document.querySelector(".rain-card");
const coffeeCard = document.querySelector(".coffee-card");
const fireCard = document.querySelector(".fire-card");

//funçoes seletor de som
const clearCards = () => {
  for (const card of cards) {
    card.classList.remove("active");
  }
};

const setActiveButton = (e) => {
  let currentCard = e.target;

  Sounds.stopAll();

  clearCards();

  currentCard.classList.add("active");
};

const handleCardClick = (e) => {
  setActiveButton(e);
};

//funçoes timer

const updateTimerDisplay = (nwMinutes, seconds) => {
  displayMinutes.textContent = String(nwMinutes).padStart(2, "0");
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
  plusButton.toggleAttribute("disabled");
  countdown();
};

const handlePauseClick = () => {
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
  clearTimeout(countdownTimeOut);
  plusButton.toggleAttribute("disabled");
};

const handleSetClick = () => {
  newMinutes = prompt("Quantos minutos?") || 0;
  updateTimerDisplay(newMinutes, 0);
};

const handleStopClick = () => {
  resetControls();
  updateTimerDisplay(newMinutes, 0);
  clearTimeout(countdownTimeOut);
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

const countdown = () => {
  countdownTimeOut = setTimeout(function () {
    minutes = Number(displayMinutes.textContent);
    seconds = Number(displaySeconds.textContent);
    if (minutes <= 0 && seconds < 1) {
      resetControls();
      updateTimerDisplay(newMinutes, 0);
      return;
    }
    if (seconds <= 0) {
      seconds = 60;
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
  handlePlusClick(
    Number(displayMinutes.textContent),
    Number(displaySeconds.textContent)
  );
minusButton.onclick = () =>
  handleMinusClick(
    Number(displayMinutes.textContent),
    Number(displaySeconds.textContent)
  );

//eventos sound selector

forestCard.onclick = (e) => {
  handleCardClick(e);
  Sounds.playForestAudio();
};

rainCard.onclick = (e) => {
  handleCardClick(e);
  Sounds.playRainAudio();
};

fireCard.onclick = (e) => {
  handleCardClick(e);
  Sounds.playFireAudio();
};

coffeeCard.onclick = (e) => {
  handleCardClick(e);
  Sounds.playCoffeeAudio();
};

stopMusicButton.onclick = (e) => {
  Sounds.stopAll();
  clearCards();
};
