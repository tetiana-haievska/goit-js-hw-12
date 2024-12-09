import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showNotification,
} from './js/render-functions';

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

function toggleLoadMoreButton(visible) {
  if (visible) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.querySelector('.search-input').value.trim();

  if (!query) return;

  page = 1;
  clearGallery();
  toggleLoadMoreButton(false);
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      showNotification('Sorry, no images found.', 'error');
    } else {
      renderGallery(data.hits);

      if (totalHits > page * 15) {
        toggleLoadMoreButton(true);
      } else {
        toggleLoadMoreButton(false);
      }
    }
  } catch (error) {
    showNotification('Something went wrong. Please try again.', 'error');
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page);
    renderGallery(data.hits);
    scrollToNewImages();

    const isLastPage = page * 15 >= totalHits;
    if (isLastPage) {
      toggleLoadMoreButton(false);
      showNotification(
        "We're sorry, but you've reached the end of search results.",
        'info'
      );
    }
  } catch (error) {
    showNotification('Something went wrong. Please try again.', 'error');
  } finally {
    hideLoader();
  }
});

function scrollToNewImages() {
  const galleryItem = gallery.lastElementChild;
  const { height } = galleryItem.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

