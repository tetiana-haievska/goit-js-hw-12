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
const loader = document.querySelector('.loader');
let currentPage = 1;
let query = '';
let lightbox;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    showNotification('Please enter a search query!', 'warning');
    return;
  }

  clearGallery();
  currentPage = 1;

  try {
    showLoader();
    const data = await fetchImages(query, currentPage);

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
  } catch (error) {
    showNotification('Something went wrong. Please try again later!', 'error');
  } finally {
    hideLoader();
  }
});
