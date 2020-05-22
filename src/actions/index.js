import { createAction } from 'redux-actions';
import api from '../fetchConfig';
import { formatLoginErrorToStr } from '../utilities/formatServerErrors';

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
    const response = await api.post('/users/login', { user });
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    const errStr = formatLoginErrorToStr(err);
    dispatch(loginUserFailure({ errors: errStr }));
    throw err;
  }
};

export const loginUserToken = () => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const response = await api.get('/user');
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    dispatch(loginUserFailure({ errors: err.response }));
    throw err;
  }
};

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUserRequest());
  try {
    await api.post('/users', { user });
    dispatch(registerUserSuccess());
  } catch (err) {
    dispatch(registerUserFailure());
    throw err;
  }
};
