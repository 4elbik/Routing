import { createAction } from 'redux-actions';
import api from '../fetchConfig';

export const articlesRequest = createAction('GET_ARTICLES_REQUEST');
export const articlesSuccess = createAction('GET_ARTICLES_SUCCESS');
export const articlesFailure = createAction('GET_ARTICLES_FAILURE');

// export const oneArticleRequest = createAction('GET_ONE_ARTICLE_REQUEST');
// export const oneArticleSuccess = createAction('GET_ONE_ARTICLE_SUCCESS');
// export const oneArticleFailure = createAction('GET_ONE_ARTICLE_FAILURE');

export const favoriteArticleRequest = createAction('ADD_LIKE_REQUEST');
export const favoriteArticleSuccess = createAction('ADD_LIKE_SUCCESS');
export const favoriteArticleFailure = createAction('ADD_LIKE_FAILURE');

export const unFavoriteArticleRequest = createAction('REMOVE_LIKE_REQUEST');
export const unFavoriteArticleSuccess = createAction('REMOVE_LIKE_SUCCESS');
export const unFavoriteArticleFailure = createAction('REMOVE_LIKE_FAILURE');

export const activeTagName = createAction('CHANGE_ACTIVE_TAG_NAME');

export const getArticles = (tagName) => async (dispatch) => {
  dispatch(articlesRequest());
  try {
    let endPoint = '/articles?limit=500&';
    if (tagName) {
      endPoint += `tag=${tagName}`;
    }
    // const response = await api.get('/articles?limit=500&offset=0');
    const response = await api.get(endPoint);
    dispatch(articlesSuccess({ articlesObj: response.data }));
  } catch (err) {
    dispatch(articlesFailure());
    throw err;
  }
};

export const favoriteArticle = (slug) => async (dispatch) => {
  dispatch(favoriteArticleRequest());
  try {
    const response = await api.post(`/articles/${slug}/favorite`);
    dispatch(favoriteArticleSuccess({ slug, article: response.data.article }));
  } catch (err) {
    dispatch(favoriteArticleFailure());
    throw err;
  }
};

export const unFavoriteArticle = (slug) => async (dispatch) => {
  dispatch(unFavoriteArticleRequest());
  try {
    const response = await api.delete(`/articles/${slug}/favorite`);
    dispatch(unFavoriteArticleSuccess({ slug, article: response.data.article }));
  } catch (err) {
    dispatch(unFavoriteArticleFailure());
    throw err;
  }
};
