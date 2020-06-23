/* eslint-disable */

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://conduit.productionready.io/api',
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
