export const renderImages = images => {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      image => `
        <div class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
        </div>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
};

export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

export const toggleLoadMoreButton = isVisible => {
  const loadMoreButton = document.querySelector('.load-more');
  loadMoreButton.style.display = isVisible ? 'block' : 'none';
};

export const showEndMessage = () => {
  alert("We're sorry, but you've reached the end of search results.");
};
