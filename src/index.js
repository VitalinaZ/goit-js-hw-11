import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './img.api';
// import { createMarkUp } from './js/markup';

const formEl = document.querySelector('.search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const divBox = document.querySelector('.gallery');

let currentPage = 1;
let totalPage = 1;
let findData = '';
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

formEl.addEventListener('submit', onSearchBtn);
loadMoreBtnEl.addEventListener('click', addImg);



  



function onSearchBtn(evt) {
  currentPage = 1;
  evt.preventDefault();
  divBox.innerHTML = '';
 
  loadMoreBtnEl.classList.add('visually-hidden');
  findData = evt.currentTarget.searchQuery.value.trim();
    if (!findData) {
    return;
  };

  fetchImages(findData, currentPage)
    .then(resp => {
      createMarkUp(resp.hits, resp.totalHits);
    })
    .catch(err => console.log(err));
  
}

function addImg() {
  currentPage += 1;
  fetchImages(findData, currentPage)
    .then(resp => {
      addMarkUp(resp.hits);
    })
    .catch(err => console.log(err));

}

function createMarkUp(data, hits) {
  totalPage = hits / 40;
  const imgData = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img src=${webformatURL} alt=${tags} loading="lazy"  width=320 height=214 /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes </br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views </br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments </br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads </br>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');

  if (!imgData) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  }
  divBox.innerHTML = imgData;
  Notify.success(`Hooray! We found ${hits} totalHits images.`);
  loadMoreBtnEl.classList.remove('visually-hidden');
  lightbox.refresh();
}

function addMarkUp(data) {
  const imgData = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img src=${webformatURL} alt=${tags} loading="lazy"  width=320 height=214 /></a>
  <div class="info">
  <p class="info-item">
      <b>Likes </br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views </br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments </br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads </br>${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  divBox.insertAdjacentHTML('beforeend', imgData);
  lightbox.refresh();
  if (currentPage > totalPage) {
    loadMoreBtnEl.classList.add('visually-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}