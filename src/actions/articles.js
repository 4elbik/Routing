import { createAction } from 'redux-actions';
import api from '../fetchConfig';
import { ARTICLES_PER_PAGE } from '../config';
import { skipArticlesCounter } from '../utilities/pagination';
import { resetWindowErrorMessage } from '.';

export const articlesRequest = createAction('GET_ARTICLES_REQUEST');
export const articlesSuccess = createAction('GET_ARTICLES_SUCCESS');
export const articlesFailure = createAction('GET_ARTICLES_FAILURE');

export const favoriteArticleRequest = createAction('ADD_LIKE_REQUEST');
export const favoriteArticleSuccess = createAction('ADD_LIKE_SUCCESS');
export const favoriteArticleFailure = createAction('ADD_LIKE_FAILURE');

export const unFavoriteArticleRequest = createAction('REMOVE_LIKE_REQUEST');
export const unFavoriteArticleSuccess = createAction('REMOVE_LIKE_SUCCESS');
export const unFavoriteArticleFailure = createAction('REMOVE_LIKE_FAILURE');

export const activeTagName = createAction('CHANGE_ACTIVE_TAG_NAME');

export const getArticles = (options) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    let endPoint = `/articles?limit=${ARTICLES_PER_PAGE}`;
    if (options && options.tagName !== '') {
      endPoint += `&tag=${options.tagName}`;
    }
    if (options && options.pageNumber) {
      const counter = skipArticlesCounter(options.pageNumber, ARTICLES_PER_PAGE);
      endPoint += `&offset=${counter}`;
    }
    const response = await api.get(endPoint);
    dispatch(articlesSuccess({ articlesObj: response.data }));
  } catch (err) {
    dispatch(articlesFailure());
    throw err;
  }
};

export const favoriteArticle = (slug) => async (dispatch) => {
  dispatch(favoriteArticleRequest(slug));
  try {
    const response = await api.post(`/articles/${slug}/favorite`);
    dispatch(favoriteArticleSuccess({ slug, article: response.data.article }));
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(favoriteArticleFailure('Please login to mark your favorite article.'));
    } else {
      dispatch(favoriteArticleFailure('Error'));
    }
    dispatch(resetWindowErrorMessage());
    throw err;
  }
};

export const unFavoriteArticle = (slug) => async (dispatch) => {
  dispatch(unFavoriteArticleRequest(slug));
  try {
    const response = await api.delete(`/articles/${slug}/favorite`);
    dispatch(unFavoriteArticleSuccess({ slug, article: response.data.article }));
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(unFavoriteArticleFailure('Please login to unmark your favorite article.'));
    } else {
      dispatch(unFavoriteArticleFailure('Error'));
    }
    dispatch(resetWindowErrorMessage());
    throw err;
  }
};
