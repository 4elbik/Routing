import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const userLoginFething = handleActions(
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

const userRegisterFething = handleActions(
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

export default combineReducers({
  userLoginFething,
  userRegisterFething,
  user,
});
