const selectedElement = window.localStorage.getItem('selected element');
const birdsList = document.querySelectorAll('.header__list-item');
const play = document.querySelector('.play');
const main = document.querySelector('.main');
const audio = new Audio();
let isPlay = false;
let isFirstStart = true;
const sources = [
  './assets/img/drozd.jpg',
  './assets/img/forest.jpg',
  './assets/img/javoronok.jpg',
  './assets/img/slavka.jpg',
  './assets/img/solovey.jpg',
  './assets/img/zarynka.jpg'
];

function preloadImages(sources) {
  let imgs = [];
  for (let i = 0; i < sources.length; i++) {
    let img = document.createElement('img');
    img.src = sources[i];
    imgs.push(img);
  }
}
preloadImages(sources);

document.addEventListener("DOMContentLoaded", () => {
  if (selectedElement) {
    audio.src = `./assets/audio/${selectedElement}.mp3`;
    main.style.backgroundImage = `url('./assets/img/${selectedElement}.jpg')`;
    birdsList.forEach(el => el.classList.remove('active'));
    birdsList.forEach(el => {
      if (el.dataset.item === selectedElement) {
        el.classList.add('active');
      }
    });
  }
});

function playAudio(el) {
  birdsList.forEach(el => el.classList.remove('active'));
  el.target.classList.add('active');
  play.classList.add('pause');
  main.style.backgroundImage = `url('./assets/img/${el.target.dataset.item}.jpg')`;
  audio.src = `./assets/audio/${el.target.dataset.item}.mp3`;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  window.localStorage.setItem('selected element', el.target.dataset.item);
}

function pauseAudio() {
  if (isFirstStart) {
    if (selectedElement) {
      audio.src = `./assets/audio/${selectedElement}.mp3`;
      isFirstStart = false;
    } else {
      audio.src = `./assets/audio/forest.mp3`;
      isFirstStart = false;
    }
  }
  if (isPlay) {
    play.classList.remove('pause');
    audio.pause();
    isPlay = false;
  } else {
    play.classList.add('pause');
    audio.play();
    isPlay = true;
  }
}

play.addEventListener('click', pauseAudio);
birdsList.forEach(el => el.addEventListener('click', playAudio));

console.log(`70 Баллов\n
Выбранные звуки сохраняются в localStorage
`);