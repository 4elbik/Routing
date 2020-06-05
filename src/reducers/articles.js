import { handleActions } from 'redux-actions';
import * as actions from '../actions/articles';

export const articlesFetching = handleActions(
  {
    [actions.articlesRequest]() {
      return 'requested';
    },
    [actions.articlesSuccess]() {
      return 'finished';
    },
    [actions.articlesFailure]() {
      return 'failed';
    },
  },
  'none'
);

export const favoriteArticleFetching = handleActions(
  {
    [actions.favoriteArticleRequest](_state, { payload: slug }) {
      return `requested ${slug}`;
    },
    [actions.favoriteArticleSuccess]() {
      return 'finished';
    },
    [actions.favoriteArticleFailure]() {
      return 'failed';
    },
  },
  'none'
);

export const unFavoriteArticleFetching = handleActions(
  {
    [actions.unFavoriteArticleRequest](_state, { payload: slug }) {
      return `requested ${slug}`;
    },
    [actions.unFavoriteArticleSuccess]() {
      return 'finished';
    },
    [actions.unFavoriteArticleFailure]() {
      return 'failed';
    },
  },
  'none'
);

export const articles = handleActions(
  {
    [actions.articlesSuccess](_state, { payload: { articlesObj } }) {
      return articlesObj;
    },
    [actions.favoriteArticleSuccess](state, { payload: { slug, article } }) {
      const newState = { ...state };
      const newArticles = newState.articles.map((el) => {
        if (el.slug === slug) {
          return article;
        }
        return el;
      });
      newState.articles = newArticles;
      return newState;
    },
    [actions.unFavoriteArticleSuccess](state, { payload: { slug, article } }) {
      const newState = { ...state };
      const newArticles = newState.articles.map((el) => {
        if (el.slug === slug) {
          return article;
        }
        return el;
      });
      newState.articles = newArticles;
      return newState;
    },
  },
  {
    articles: [],
    articlesCount: 0,
  }
);

export const activeTagName = handleActions(
  {
    [actions.activeTagName](_state, { payload: tagName }) {
      return tagName;
    },
  },
  ''
);
