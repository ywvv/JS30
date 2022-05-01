const images = document.querySelectorAll('.img');
const search = document.querySelector('.search');
const form = document.querySelector('.form');
const unsplashBtn = document.querySelector('.unsplash-btn');
const flickrBtn = document.querySelector('.flickr-btn');
const downloadLink = document.querySelectorAll('.download');
let selectedService;
let searchText = 'yellow';

const setUnsplashBg = async () => {
  let url = `https://api.unsplash.com/search/photos?query=${searchText}&client_id=foGxDQRmCgNucwzfIPqH82VyCdMcNkwf8Bc3oAlSkEw&per_page=12&orientation=landscape`;
  const res = await fetch(url);
  const data = await res.json();
  let i = 0;
  if (data.total == 0 && search.value) {
    search.value = '';
    search.classList.add('error');
    search.placeholder = 'no results';
    images.forEach(el => el.parentNode.style.visibility = 'hidden');
  } else {
    search.placeholder = 'Search...';
    search.classList.remove('error');
    images.forEach(el => {
      el.parentNode.style.visibility = 'visible';
      el.style.backgroundImage = `url('${data?.results[i]?.urls.regular}')`;
      i++;
      if(el.style.backgroundImage == 'url("undefined")') {
        el.parentNode.style.visibility = 'hidden';
      }
    });
    let a = 0;
    downloadLink.forEach(elem => {
      elem.href = data?.results[a]?.links.download;
      a++;
    });
  }
};

const setFlickrBg = async() => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=12&orientation=landscape&api_key=c75c58378aa1469ca712d45ef06554d4&text=${searchText}&extras=url_m,url_l,url_o&sort=interestingness-desc&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  let i = 0;
  let a = 0;
  if (data.photos.total == 0 && search.value) {
    search.value = '';
    search.classList.add('error');
    search.placeholder = 'no results';
    images.forEach(el => el.parentNode.style.visibility = 'hidden');
  } else {
    search.classList.remove('error');
    search.placeholder = 'Search...';
    images.forEach(el => {
      el.parentNode.style.visibility = 'visible';
      el.style.backgroundImage = `url('${data?.photos?.photo[i]?.url_m}')`;
      i++;
      if(el.style.backgroundImage == 'url("undefined")') {
        el.parentNode.style.visibility = 'hidden';
      }
    });
    downloadLink.forEach(elem => {
      if (data?.photos?.photo[a]?.url_o) {
        elem.href = data?.photos?.photo[a]?.url_o;
      } else {
        elem.href = data?.photos?.photo[a]?.url_l;
      }
      a++;
    });
  }
};

const selectUnsplash = () => {
  selectedService = 'unsplash';
  flickrBtn.classList.remove('active');
  unsplashBtn.classList.add('active');
  setUnsplashBg();
};

const selectFlickr = () => {
  selectedService = 'flickr';
  unsplashBtn.classList.remove('active');
  flickrBtn.classList.add('active');
  setFlickrBg();
};

const submitForm = () => {
  if (!search.value) {
    search.classList.add('error');
  } else {
    search.classList.remove('error');
    searchText = search.value;
    selectedService === 'flickr' ? setFlickrBg() : setUnsplashBg();
  }
};

const cleanForm = () => {
  search.classList.remove('error');
  search.placeholder = 'Search...';
};

setUnsplashBg();
form.addEventListener('submit', submitForm);
form.addEventListener('keypress', cleanForm);
form.addEventListener('focusout', cleanForm);
unsplashBtn.addEventListener('click', selectUnsplash);
flickrBtn.addEventListener('click', selectFlickr);