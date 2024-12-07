import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  toggleLoadMoreButton,
  showEndMessage,
} from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  if (!query) return;

  clearGallery();
  page = 1;
  toggleLoadMoreButton(false);

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      alert('No images found for your query.');
      return;
    }

    renderImages(data.hits);
    lightbox.refresh();

    if (totalHits > perPage) toggleLoadMoreButton(true);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);

    renderImages(data.hits);
    lightbox.refresh();

    const galleryHeight =
      gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryHeight * 2,
      behavior: 'smooth',
    });

    if (page * perPage >= totalHits) {
      toggleLoadMoreButton(false);
      showEndMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
