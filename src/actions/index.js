import { createAction } from 'redux-actions';
import apiService from '../fetchConfig';
import { formatLoginErrorToStr } from '../utilities/formatServerErrors';

export const loginUserRequest = createAction('USER_LOGIN_REQUEST');
export const loginUserSuccess = createAction('USER_LOGIN_SUCCESS');
export const loginUserFailure = createAction('USER_LOGIN_FAILURE');

export const logoutUser = createAction('USER_LOGOUT');

export const registerUserRequest = createAction('USER_REGISTER_REQUEST');
export const registerUserSuccess = createAction('USER_REGISTER_SUCCESS');
export const registerUserFailure = createAction('USER_REGISTER_FAILURE');

export const resetWindowSuccessMessage = createAction('RESET_WINDOW_SUCCESS_MESSAGE');
export const resetWindowErrorMessage = createAction('RESET_WINDOW_ERRORS_MESSAGE');

export const loginUser = (user) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const response = await apiService.post('/users/login', { user });
    localStorage.setItem('token', response.data.user.token);
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
    const response = await apiService.get('/user');
    localStorage.setItem('token', response.data.user.token);
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    dispatch(loginUserFailure({ errors: 'Please log in again' }));
    throw err;
  }
};

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUserRequest());
  try {
    await apiService.post('/users', { user });
    dispatch(registerUserSuccess());
  } catch (err) {
    dispatch(registerUserFailure());
    throw err;
  }
};
