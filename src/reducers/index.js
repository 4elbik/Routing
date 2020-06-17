import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import * as actionsArticle from '../actions/articles';
import * as reducerArticle from './articles';

const userLoginFetching = handleActions(
  {
    [actions.loginUserRequest]() {
      return 'requested';
    },
    [actions.loginUserSuccess]() {
      return 'finished';
    },
    [actions.loginUserFailure]() {
      return 'failed';
    },
  },
  'none'
);

const userRegisterFetching = handleActions(
  {
    [actions.registerUserRequest]() {
      return 'requested';
    },
    [actions.registerUserSuccess]() {
      return 'finished';
    },
    [actions.registerUserFailure]() {
      return 'failed';
    },
  },
  'none'
);

const user = handleActions(
  {
    [actions.loginUserSuccess](_state, { payload: { user: userData } }) {
      return userData;
    },
    [actions.loginUserFailure](_state, { payload: { errors } }) {
      return { errors };
    },
    [actions.logoutUser]() {
      return {};
    },
  },
  {}
);

const isAuth = handleActions(
  {
    [actions.loginUserSuccess]() {
      return true;
    },
    [actions.logoutUser]() {
      return false;
    },
  },
  false
);

const errorMessage = handleActions(
  {
    [actionsArticle.favoriteArticleFailure](_state, { payload: error }) {
      return error;
    },
    [actionsArticle.unFavoriteArticleFailure](_state, { payload: error }) {
      return error;
    },
    [actions.resetWindowErrorMessage]() {
      return '';
    },
  },
  ''
);

export default combineReducers({
  userLoginFetching,
  userRegisterFetching,
  user,
  isAuth,
  errorMessage,
  articlesFetching: reducerArticle.articlesFetching,
  articles: reducerArticle.articles,
  favoriteArticleFetching: reducerArticle.favoriteArticleFetching,
  unFavoriteArticleFetching: reducerArticle.unFavoriteArticleFetching,
  activeTagName: reducerArticle.activeTagName,
  editArticleFetching: reducerArticle.editArticleFetching,
  deleteArticleFetching: reducerArticle.deleteArticleFetching,
});
