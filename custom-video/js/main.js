const video = document.querySelector('.video'),
      player = document.querySelector('.video-player'),
      playBtn = document.querySelector('.play-btn'),
      playBtnCnt = document.querySelector('.play-icon'),
      volumeBtnCnt = document.querySelector('.volume-icon'),
      volumeRange = document.querySelector('.volume'),
      progressRange = document.querySelector('.progress'),
      fullscreenBtn = document.querySelector('.fullscreen-icon'),
      controls = document.querySelector('.controls'),
      poster = document.querySelector('.poster');

let isPlay = false,
    isFullscreen;

document.addEventListener("DOMContentLoaded", () => video.volume = volumeRange.value);


function playVideo() {
  poster.style.opacity = '0';
  if (!isPlay) {
    isPlay = true;
    playBtn.style.display = 'none';
    playBtnCnt.classList.add('pause');
    video.play();
    setInterval(() => {
      progressRange.value = video.currentTime / video.duration * 100;
      progressRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressRange.value}%, #c8c8c8 ${progressRange.value}%, #c8c8c8 100%)`;
    }, 10);
  } else {
    isPlay = false;
    playBtn.style.display = 'block';
    playBtnCnt.classList.remove('pause');
    video.pause();
  }
}

function toggleVolume() {
  volumeBtnCnt.classList.toggle('mute');
  if (volumeBtnCnt.classList.contains('mute')) {
    video.volume = 0;
  } else {
    video.volume = volumeRange.value;
  }
}

function setVolume() {
  video.volume = volumeRange.value;
  volumeRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volumeRange.value * 100}%, #c8c8c8 ${volumeRange.value * 100}%, #c8c8c8 100%)`;
  if (video.volume === 0) {
    volumeBtnCnt.classList.add('mute');
  } else {
    volumeBtnCnt.classList.remove('mute');
  }
}

function setProgress() {
  video.currentTime = progressRange.value * (video.duration / 100);
  progressRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressRange.value}%, #c8c8c8 ${progressRange.value}%, #c8c8c8 100%)`;
}

function toggleFullscreen() {
  if (!isFullscreen) {
    fullscreenBtn.style.backgroundImage = 'url(./assets/svg/fullscreen-off.svg)';
    isFullscreen = true;
    player.style.cursor = 'none';
    player.requestFullscreen();
    let to = 2000,
        ts = 0;
    addEventListener('mousemove', () => {
      ts = Date.now();
      player.style.cursor = "default";
      controls.style.opacity = '1';
    });
    setInterval(() => {
      if (isFullscreen) {
        if (Date.now() - ts > to) {
          controls.style.opacity = '0';
          player.style.cursor = "none";
        }
      }
    }, 100);
  } else {
    fullscreenBtn.style.backgroundImage = 'url(./assets/svg/fullscreen.svg)';
    player.style.cursor = 'auto';
    isFullscreen = false;
    document.exitFullscreen();
  }
}


video.addEventListener('click', playVideo);
playBtn.addEventListener('click', playVideo);
playBtnCnt.addEventListener('click', playVideo);
volumeBtnCnt.addEventListener('click', toggleVolume);
volumeRange.addEventListener('input', setVolume);
progressRange.addEventListener('input', setProgress);
video.addEventListener('ended', playVideo);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    playVideo();
  }
  if (event.code === 'ArrowLeft') {
    video.currentTime -= 2;
  }
  if (event.code === 'ArrowRight') {
    video.currentTime += 2;
  }
  if (event.code === 'ArrowUp') {
    volumeRange.value = Number(volumeRange.value) + 0.1;
    setVolume();
  }
  if (event.code === 'ArrowDown') {
    volumeRange.value -= 0.1;
    setVolume();
  }
  if (event.code === 'KeyM') {
    toggleVolume();
  }
});


document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.style.backgroundImage = 'url(./assets/svg/fullscreen.svg)';
    isFullscreen = false;
  }
});

console.log(`ОТМЕТКА - 70 БАЛЛОВ\n
Дополнительный функционал:\n
1. Управление плеером с клавиатуры:\n
   пробел - play/pause;\n
   m - mute;\n
   стрелочки влево/вправо - перемотка взад/вперед;\n
   стрелочки вверх/вниз - управление громкостью.\n
2. В полноэкранном режиме спустя три секунды бездействия исчезает панель управления.\n
`);