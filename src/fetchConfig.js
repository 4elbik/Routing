/* eslint-disable */

import axios from 'axios';
import { ARTICLES_PER_PAGE } from './config';

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

const get = (url, query) => {
  if (!query) {
    return api.get(`${url}?limit=${ARTICLES_PER_PAGE}`);
  }

  const queryModified = Object.entries(query).reduce((acc, [key, value]) => {
    if (value !== '') {
      return `${acc}&${key}=${value}`;
    }
    return acc;
  }, `limit=${ARTICLES_PER_PAGE}`);

  return api.get(`${url}?${queryModified}`);
};

const apiService = {
  ...api,
  get,
};

export default apiService;
