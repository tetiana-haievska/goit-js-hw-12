import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showNotification,
} from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let lightbox;
let currentPage = 1;
let query = '';
const perPage = 15;
let totalHits = 0;

/**
 * Відображення або приховування кнопки Load More
 * @param {boolean} isVisible
 */
function toggleLoadMoreButton(isVisible) {
  loadMoreButton.style.display = isVisible ? 'block' : 'none';
}

/**
 * Повідомлення про досягнення кінця результатів
 */
function showEndMessage() {
  iziToast.info({
    title: 'End of results',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

// Обробник події сабміту форми
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    showNotification('Please enter a search query!', 'warning');
    return;
  }

  clearGallery();
  currentPage = 1;
  toggleLoadMoreButton(false);

  try {
    showLoader();
    const data = await fetchImages(query, currentPage, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!',
        'error'
      );
    } else {
      renderGallery(data.hits);
      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a');
      } else {
        lightbox.refresh();
      }
    }

    if (totalHits > perPage) toggleLoadMoreButton(true);
  } catch (error) {
    showNotification('Something went wrong. Please try again later!', 'error');
  } finally {
    hideLoader();
  }
});

// Обробник події кліку на Load More
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    const data = await fetchImages(query, currentPage, perPage);

    renderGallery(data.hits, true); // Додати нові зображення
    lightbox.refresh();

    // Плавне прокручування сторінки
    const galleryHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage * perPage >= totalHits) {
      toggleLoadMoreButton(false);
      showEndMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
