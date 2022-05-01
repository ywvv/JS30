const films = document.querySelector('.films');
const wrapper = document.querySelectorAll('.wrapper');
const filmPoster = document.querySelectorAll('.film-poster');
const filmTitle = document.querySelectorAll('.film-title');
const filmDescription = document.querySelectorAll('.film-description');
const filmRating = document.querySelectorAll('.film-rating');
const search = document.querySelector('.search');
const form = document.querySelector('.form');
const title = document.querySelector('.title');
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup-title');
const popupDescription = document.querySelector('.popup-description');
const closeInfoBtn = document.querySelector('.popup-x');
const overlay = document.querySelector('.overlay');
let filmName;

const firstStart = async() => {
  let url = 'https://api.themoviedb.org/3/movie/popular?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
  const res = await fetch(url);
  const data = await res.json();
  for (let i = 0; i < data.results.length; i++) {
    if (data.results[i].backdrop_path != null) {
      filmPoster[i].style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${data?.results[i]?.poster_path}')`;
      filmTitle[i].textContent = `${data?.results[i]?.original_title} (${(data?.results[i]?.release_date).substr(0, 4)})`;
      filmDescription[i].textContent = data?.results[i]?.overview;

      filmRating[i].textContent = data?.results[i]?.vote_average;
      if (filmRating[i].textContent <= 4) {
        filmRating[i].style.backgroundColor = '#ff5031';
      } else if (filmRating[i].textContent <= 6) {
        filmRating[i].style.backgroundColor = '#fd9b27';
      } else {
        filmRating[i].style.backgroundColor = '#64c809';
      }
    }
  }
};

firstStart();

const getFilms = async() => {
  wrapper.forEach(el => el.style.display = 'none');
  let url = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${filmName}&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  if (data.results.length === 0) {
    title.textContent = 'No Results :(';
  }
  for (let i = 0; i < data?.results.length; i++) {
    if (data.results[i].backdrop_path != null) {
      wrapper[i].style.display = 'block';
      filmPoster[i].style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${data?.results[i]?.poster_path}')`;
      filmTitle[i].textContent = `${data?.results[i]?.original_title} (${(data?.results[i]?.release_date).substr(0, 4)})`;
      filmDescription[i].textContent = data?.results[i]?.overview;

      filmRating[i].textContent = data?.results[i]?.vote_average;
      if (filmRating[i].textContent <= 4) {
        filmRating[i].style.backgroundColor = '#ff5031';
      } else if (filmRating[i].textContent <= 6) {
        filmRating[i].style.backgroundColor = '#fd9b27';
      } else {
        filmRating[i].style.backgroundColor = '#64c809';
      }
    }
  }
};

const submitForm = () => {
  filmName = search.value;
  title.textContent = search.value;
  getFilms();
};

form.addEventListener('submit', submitForm);

const showInfo = () => {
  overlay.style.visibility = 'visible';
  overlay.style.opacity = '1';
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
};

const hideInfo = () => {
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  popup.style.opacity = '0';
  popup.style.visibility = 'hidden';
};

overlay.addEventListener('click', hideInfo);
closeInfoBtn.addEventListener('click', hideInfo);

wrapper.forEach(el => el.addEventListener('click', () => {
  popupTitle.textContent = el.children[1].textContent;
  popupDescription.textContent = el.children[3].textContent;
  popup.style.backgroundImage = el.children[0].style.backgroundImage;
  showInfo();
}));

if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
  filmTitle.forEach(el => el.style.opacity = '1');
  filmRating.forEach(el => el.style.opacity = '1');
}