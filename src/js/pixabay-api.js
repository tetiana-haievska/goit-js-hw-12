import axios from 'axios';

const API_KEY = '47504647-de6fca25d262a81a07b30a07f';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page, perPage = 15) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return response.data;
};
