import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '42274052-b5209bd40b827282c0377ed93';

const baseSearchParams = {
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

export const fetchImages = async (q, page) => {
  const { data } = await axios.get(`${BASE_URL}`, {
    params: { ...baseSearchParams, q, page },
  });
  return data;
};