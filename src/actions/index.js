import axios from 'axios';
import { createAction } from 'redux-actions';
import { formatLoginErrorToStr } from '../utilities';

export const loginUserRequest = createAction('USER_LOGIN_REQUEST');
export const loginUserSuccess = createAction('USER_LOGIN_SUCCESS');
export const loginUserFailure = createAction('USER_LOGIN_FAILURE');

export const logoutUser = createAction('USER_LOGOUT');

export const registerUserRequest = createAction('USER_REGISTER_REQUEST');
export const registerUserSuccess = createAction('USER_REGISTER_SUCCESS');
export const registerUserFailure = createAction('USER_REGISTER_FAILURE');

export const loginUser = (user) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const url = 'http://conduit.productionready.io/api/users/login';
    const response = await axios.post(url, { user });
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    const errStr = formatLoginErrorToStr(err);
    dispatch(loginUserFailure({ errors: errStr }));
    throw err;
  }
};

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUserRequest());
  try {
    const url = 'http://conduit.productionready.io/api/users';
    await axios.post(url, { user });
    dispatch(registerUserSuccess());
  } catch (err) {
    dispatch(registerUserFailure());
    throw err;
  }
};
