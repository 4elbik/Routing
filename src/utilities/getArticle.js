import api from '../fetchConfig';

export default async (slug) => {
  try {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  } catch (err) {
    return false;
  }
};
