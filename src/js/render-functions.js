import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery__item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>
  `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup); // Додає нові елементи до галереї
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Очищає всю галерею
}

export const toggleLoadMoreButton = (isVisible) => {
  const loadMoreButton = document.querySelector('.load-more');
  if (loadMoreButton) {
    loadMoreButton.style.display = isVisible ? 'block' : 'none';
  }
};

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('hidden');
}

export function showNotification(message, type = 'info') {
  if (!['info', 'success', 'warning', 'error'].includes(type)) {
    console.error(`Invalid notification type: ${type}`);
    return;
  }
  iziToast[type]({
    title: 'Notification',
    message,
    position: 'topRight',
  });
}
