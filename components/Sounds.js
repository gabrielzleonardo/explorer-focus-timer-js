const Sounds = {
  forestAudio: new Audio("../assets/music/forest-audio.wav"),
  rainAudio: new Audio("../assets/music/rain-audio.wav"),
  coffeeAudio: new Audio("../assets/music/coffee-audio.wav"),
  fireAudio: new Audio("../assets/music/fireplace-audio.wav"),

  playForestAudio() {
    this.forestAudio.play();
    this.forestAudio.loop = true;
  },
  playRainAudio() {
    this.rainAudio.play();
    this.rainAudio.loop = true;
  },
  playCoffeeAudio() {
    this.coffeeAudio.play();
    this.coffeeAudio.loop = true;
  },
  playFireAudio() {
    this.fireAudio.play();
    this.fireAudio.loop = true;
  },

  stopAll() {
    this.forestAudio.pause();
    this.fireAudio.pause();
    this.coffeeAudio.pause();
    this.rainAudio.pause();
  },
};

export default Sounds;
