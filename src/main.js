import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.search-btn'),
  list: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  sentinel: document.querySelector('.sentinel'),
};

let page = 1;
let query = '';
let uploadedImages = 0;
let totalImages = 0;
let modalLightbox;

refs.form.addEventListener('submit', handleSeachBtnClick);

async function handleSeachBtnClick(e) {
  observer.disconnect(refs.sentinel);
  e.preventDefault();
  refs.loader.classList.remove('hidden');
  page = 1;
  query = '';
  uploadedImages = 0;
  totalImages = 0;

  if (!e.currentTarget.searchQuery.value.trim()) {
    iziToast.error({
      message: `Sorry, your search query is empty. Please try again.`,
      position: 'topRight',
      transitionIn: 'fadeInRight',
      transitionOut: 'fadeOutLeft',
      backgroundColor: 'orange',
    });
    refs.loader.classList.add('hidden');
    refs.list.innerHTML = '';
    return;
  }

  try {
    query = e.currentTarget.searchQuery.value.trim();
    const data = await fetchImages(
      e.currentTarget.searchQuery.value.trim(),
      page
    );
    onSuccess(data);
    if (uploadedImages >= totalImages && uploadedImages > 0) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
        transitionIn: 'fadeInRight',
        transitionOut: 'fadeOutLeft',
      });
    }
  } catch (error) {
    refs.loader.classList.add('hidden');
    iziToast.error({
      message: `${error.message}`,
      position: 'topRight',
      transitionIn: 'fadeInRight',
      transitionOut: 'fadeOutLeft',
      backgroundColor: 'orange',
    });
  }
  observer.observe(refs.sentinel);
  e.target.reset();
}

function onSuccess(data) {
  refs.loader.classList.add('hidden');
  if (!data.totalHits) {
    iziToast.error({
      message: `Sorry, there are no images matching your search query. Please try again.`,
      position: 'topRight',
      transitionIn: 'fadeInRight',
      transitionOut: 'fadeOutLeft',
      backgroundColor: 'orange',
    });
    refs.list.innerHTML = '';
    return;
  }
  page += 1;
  totalImages = data.totalHits;
  uploadedImages += data.hits.length;
  iziToast.success({
    message: `Hooray! We found ${data.totalHits} images.`,
    position: 'topRight',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutLeft',
    backgroundColor: 'green',
  });
  refs.list.innerHTML = markup(data);
  modalLightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  modalLightbox.refresh();
}

function markup({ hits }) {
  const result = hits
    .map(el => {
      return `<a class="link" href=${el.largeImageURL} id=${el.id}><div class="photo-card" >
    <div class="img-wrap"><img src=${el.webformatURL} alt=${el.tags} loading="lazy"/></div>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <span>${el.likes}</span>
        </p>
        <p class="info-item">
            <b>Views</b>
            <span>${el.views}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${el.comments}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${el.downloads}</span>
        </p>
    </div>
</div></a>`;
    })
    .join('');
  return result;
}

async function loadMoreImages() {
  modalLightbox.destroy();

  try {
    const data = await fetchImages(query, page);
    refs.list.insertAdjacentHTML('beforeend', markup(data));
    page += 1;
    uploadedImages += data.hits.length;
    modalLightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
    });
    if (uploadedImages >= totalImages) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'toptopRight',
        transitionIn: 'fadeInRight',
        transitionOut: 'fadeOutLeft',
      });
    }
  } catch (error) {
    iziToast.error({
      message: `${error.message}`,
      position: 'topRight',
      transitionIn: 'fadeInRight',
      transitionOut: 'fadeOutLeft',
    });
  }
}

const intersectionObserve = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && query !== '' && uploadedImages < totalImages) {
      loadMoreImages();
    }
  });
};

const observer = new IntersectionObserver(intersectionObserve, {
  rootMargin: '200px',
});
