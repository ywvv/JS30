const genQuote = document.querySelector('.button');
const ruBtn = document.querySelector('.ru-btn');
const enBtn = document.querySelector('.en-btn');
const author = document.querySelector('.author');
const quote = document.querySelector('.quote');
const langButtons = document.querySelectorAll('.lang-btn');
const audioEffectReload = document.querySelector('.audio-reload');
const audioEffectClick = document.querySelector('.audio-click');

let lang;
let randomAuthor;
let randomAuthorRu;
let randomQuote;
let randomQuoteRu;
let deg = 0;

document.addEventListener("DOMContentLoaded", () => {
  if (window.localStorage.getItem('lang') == 'ru') {
    lang = 'ru';
    enBtn.classList.remove('active');
    ruBtn.classList.add('active');
  } else {
    lang = 'en';
  }
});

async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let random = data[Math.floor(Math.random() * data.length)];
    if (random.authorRu === author.innerText || random.author === author.innerText) {
      getQuotes();
    } else {
      if (lang === 'ru'){
        quote.innerText = `"${random.textRu}"`;
        author.innerText = random.authorRu;
      } else {
        quote.innerText = `"${random.text}"`;
        author.innerText = random.author;
      }
      randomAuthorRu = random.authorRu;
      randomQuoteRu = `"${random.textRu}"`;
      randomAuthor = random.author;
      randomQuote = `"${random.text}"`;
    }
}

genQuote.addEventListener('click', () => {
  window.localStorage.setItem('lang', lang);
  audioEffectReload.play();
  deg += 180;
  genQuote.style.transform = `rotate(${deg}deg)`;
  getQuotes();
});

genQuote.addEventListener("click", getQuotes());

audioEffectReload.volume = 0.5;
audioEffectClick.volume = 0.5;

enBtn.addEventListener("click", () => {
  audioEffectClick.play();
  lang = 'en';
  ruBtn.classList.remove('active');
  enBtn.classList.add('active');
  quote.innerText = randomQuote;
  author.innerText = randomAuthor;
  window.localStorage.setItem('lang', 'en');
});

ruBtn.addEventListener("click", () => {
  audioEffectClick.play();
  lang = 'ru';
  enBtn.classList.remove('active');
  ruBtn.classList.add('active');
  quote.innerText = randomQuoteRu;
  author.innerText = randomAuthorRu;
  window.localStorage.setItem('lang', 'ru');
});