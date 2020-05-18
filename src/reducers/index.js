import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

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

export default combineReducers({
  userLoginFetching,
  userRegisterFetching,
  user,
  isAuth,
});
