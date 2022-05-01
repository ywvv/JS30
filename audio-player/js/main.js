const playBtn = document.querySelector('.play');
const stopBtn = document.querySelector('.stop');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const cover = document.querySelector('.cover');
const authorName = document.querySelector('.author');
const songName = document.querySelector('.song');
const durationTime = document.querySelector('.duration');
const currentTime = document.querySelector('.current');
const range = document.querySelector('.range');
const audio = document.querySelector('.audio');
const downloadLink = document.querySelector('.download');
let i = 0;
let isPlay = false;

const sources = [
  './assets/img/Unfurl.webp',
  './assets/img/Dawn.webp',
  './assets/img/Sacred_Ground.webp',
  './assets/svg/play.svg',
  './assets/svg/stop.svg',
  './assets/svg/prev.svg',
  './assets/svg/next.svg',
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

const playList = [
  {
    author: 'RY X',
    song: 'Body Sun',
    src: './assets/audio/RY X - Body Sun.mp3',
    cover: './assets/img/Unfurl.webp',
    duration: '05:00'
  },
  {
    author: 'RY X',
    song: 'Shortline',
    src: './assets/audio/RY X - Shortline.mp3',
    cover: './assets/img/Dawn.webp',
    duration: '03:54'
  },
  {
    author: 'Howling',
    song: 'Stole the Night',
    src: './assets/audio/Howling - Stole the Night.mp3',
    cover: './assets/img/Sacred_Ground.webp',
    duration: '04:21'
  },
  {
    author: 'RY X',
    song: 'The Water',
    src: './assets/audio/RY X - The Water.mp3',
    cover: './assets/img/Unfurl.webp',
    duration: '04:22'
  },
  {
    author: 'RY X',
    song: 'Sweat',
    src: './assets/audio/RY X - Sweat.mp3',
    cover: './assets/img/Dawn.webp',
    duration: '03:59'
  },
  {
    author: 'RY X',
    song: 'YaYaYa',
    src: './assets/audio/RY X - YaYaYa.mp3',
    cover: './assets/img/Unfurl.webp',
    duration: '03:49'
  },
  {
    author: 'RY X',
    song: 'Howling',
    src: './assets/audio/RY X - Howling.mp3',
    cover: './assets/img/Dawn.webp',
    duration: '05:09'
  },
  {
    author: 'Howling',
    song: 'Short Line',
    src: './assets/audio/Howling - Short Line.mp3',
    cover: './assets/img/Sacred_Ground.webp',
    duration: '06:02'
  },
  {
    author: 'RY X',
    song: 'Only',
    src: './assets/audio/RY X - Only.mp3',
    cover: './assets/img/Dawn.webp',
    duration: '04:28'
  },
];

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) {
    return `0${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

function playAudio() {
  cover.classList.add('shadow');
  audio.src = playList[i].src;
  cover.style.backgroundImage = `url('${playList[i].cover}')`;
  authorName.textContent = playList[i].author;
  songName.textContent = playList[i].song;
  durationTime.textContent = playList[i].duration;
  downloadLink.href = playList[i].src;
  downloadLink.download = `${playList[i].author} - ${playList[i].song}`;
  if (!isPlay) {
    playBtn.style.backgroundImage = `url(./assets/svg/stop.svg)`;
    audio.play();
    isPlay = true;
  } else {
    playBtn.style.backgroundImage = `url(./assets/svg/play.svg)`;
    audio.pause();
    isPlay = false;
  }
}

playBtn.addEventListener('click', playAudio);

nextBtn.addEventListener('click', () => {
  isPlay = false;
  if (i === playList.length - 1) {
    i = 0;
  } else {
    i++;
  }
  playAudio();
});

prevBtn.addEventListener('click', () => {
  isPlay = false;
  if (i === 0) {
    i = playList.length - 1;
  } else {
    i--;
  }
  playAudio();
});

audio.addEventListener('ended', () => {
  if (i === playList.length) {
    i = 0;
    isPlay = false;
  } else {
    i++;
    isPlay = false;
  }
  playAudio();
});

range.addEventListener('input', function() {
  this.style.background = `linear-gradient(to right, white 0%, white ${this.value}%, black ${this.value}%, black 100%)`;
  audio.currentTime = this.value * (audio.duration / 100);
});

setInterval(() => {
  let trackDuration = audio.duration ? audio.duration : 1;
  range.value = audio.currentTime / Math.floor(trackDuration) * 100;
  range.style.background = `linear-gradient(to right, white 0%, white ${range.value}%, black ${range.value}%, black 100%)`;
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}, 1000);

console.log(`ОТМЕТКА - 70 БАЛЛОВ\n
Добавлена возможность скачивать треки`);