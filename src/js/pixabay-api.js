import axios from 'axios';

const API_KEY = '47504647-de6fca25d262a81a07b30a07f';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page, perPage = 15) => {
  if (!query || typeof query !== 'string') {
    throw new Error('Query must be a non-empty string');
  }
  if (page <= 0 || typeof page !== 'number') {
    throw new Error('Page must be a positive number');
  }

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  console.log('Fetching images with params:', params);

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error;
  }
};
