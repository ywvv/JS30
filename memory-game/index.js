
const menuSection = document.querySelector('.menu');
const newGameBtn = menuSection.querySelector('.new-game-btn');
const toRecordsMenuBtn = menuSection.querySelector('.records-btn');

const gameSection = document.querySelector('.game');
const cards = gameSection.querySelectorAll('.memory-card');
const timer = gameSection.querySelector('.timer');
const toMenuBtn = gameSection.querySelector('.menu-btn');
const toRecordsGameBtn = gameSection.querySelector('.records-btn');

const recordsSection = document.querySelector('.records');
const backBtn = recordsSection.querySelector('.back-btn');
const resultsList = recordsSection.querySelector('.records-list');
const recordsListItem = resultsList.querySelectorAll('.records-item');

const overlay = document.querySelector('.overlay');
const result = overlay.querySelector('.result');
const resultImg = overlay.querySelector('.result-img');
const resultTime = overlay.querySelector('.result-time');
const resultMoves = overlay.querySelector('.result-moves');
const retryBtn = overlay.querySelector('.retry-btn');

let numberOfMoves = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let flippedCount = 0;
let timeInSec = 0;
let timerInterval;
let isStartTime = false;
let isInGame = false;
let recordsArr = [];

function flipCard() {
  timer.style.visibility = 'visible';
  timer.style.opacity = '1';
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  cards.forEach(card => {
    if (card.classList.contains('flip')) {
      flippedCount += 1;
      checkForWin();
    }
  });
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  numberOfMoves += 2;
}



function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();


function newGame() {
  overlay.style.opacity = '0';
  overlay.style.display = 'none';
  flippedCount = 0;
  result.textContent = '';
  cards.forEach(card => card.classList.remove('flip'));
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
  isStartTime = false;
}

function startTime() {
  if (!isStartTime) {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
      timeInSec += 1;
      isStartTime = true;
      convertSecondsToTime();
    }, 10);
  }
}

function convertSecondsToTime() {
  let givenSeconds = timeInSec;

  const dateObj = new Date(givenSeconds * 10);
  const seconds = dateObj.getSeconds();

  const  timeString =
    (60 - seconds.toString().padStart(2, '0'));
  timer.textContent = timeString;
  if (timer.textContent === '1') {
    setTimeout(checkForLose(), 1000);
  }
}

function stopTime() {
  clearInterval(timerInterval);
}

function resetTime() {
  clearInterval(timerInterval);
  timer.style.visibility = 'hidden';
  timer.style.opacity = '0';
  timeInSec = 0;
}

function checkForWin() {
  if(flippedCount === 42) {
    overlay.style.display = 'flex';
    setTimeout(function() {
      overlay.style.opacity = '1';
    }, 1000);
    resultImg.src = './img/win.svg';
    result.textContent = 'YOU WIN';
    resultMoves.textContent =`${numberOfMoves} MOVES`;
    recordsArr.push(numberOfMoves);
    localStorage.setItem('arr', JSON.stringify(recordsArr));
    numberOfMoves = 0;

    resetTime();
    stopTime();
  }
}

function checkForLose() {
  overlay.style.display = 'flex';
  setTimeout(function() {
    overlay.style.opacity = '1';
  }, 1000);
  resultImg.src = './img/lose.svg';
  result.textContent = 'YOU LOSE';

  resetTime();
  stopTime();
}

function showMenu() {
  isInGame = false;
  menuSection.style.display = 'flex';
  gameSection.style.display = 'none';
  newGame();
  resetTime();
  stopTime();
}

function showGame() {
  isInGame = true;
  menuSection.style.display = 'none';
  gameSection.style.display = 'flex';
}

function showRecordsMenu() {
  if (localStorage.getItem('arr')) {
    recordsArr.sort((a, b) => a - b);
    for (let i = 0; i < recordsArr.length && i < recordsListItem.length; i++) {
      recordsListItem[i].textContent = `${i+1}) ${recordsArr[i]} moves`;
    }
  }
  menuSection.style.display = 'none';
  recordsSection.style.display = 'flex';
}

function showRecordsGame() {
  recordsArr.sort((a, b) => a - b);
  for (let i = 0; i < recordsArr.length && i < recordsListItem.length; i++) {
    recordsListItem[i].textContent = `${i+1}) ${recordsArr[i]} moves`;
  }
  gameSection.style.display = 'none';
  recordsSection.style.display = 'flex';
  newGame();
  resetTime();
  stopTime();
}

function backTo() {
  if (!isInGame) {
    recordsSection.style.display = 'none';
    menuSection.style.display = 'flex';
  } else {
    recordsSection.style.display = 'none';
    gameSection.style.display = 'flex';
  }
}

toMenuBtn.addEventListener('click', showMenu);
newGameBtn.addEventListener('click', showGame);
toRecordsMenuBtn.addEventListener('click', showRecordsMenu);
backBtn.addEventListener('click', backTo);
toRecordsGameBtn.addEventListener('click', showRecordsGame);
retryBtn.addEventListener('click', newGame);
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', startTime));

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('arr')) {
    recordsArr = JSON.parse(localStorage.getItem('arr'));
  } else {
    recordsArr = [];
  }
});

console.log('60 БАЛЛОВ');