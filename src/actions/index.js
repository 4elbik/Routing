import axios from 'axios';
import { createAction } from 'redux-actions';
import { formatLoginErrorToStr } from '../utilities/formatServerErrors';

export const loginUserRequest = createAction('USER_LOGIN_REQUEST');
export const loginUserSuccess = createAction('USER_LOGIN_SUCCESS');
export const loginUserFailure = createAction('USER_LOGIN_FAILURE');

export const logoutUser = createAction('USER_LOGOUT');

export const registerUserRequest = createAction('USER_REGISTER_REQUEST');
export const registerUserSuccess = createAction('USER_REGISTER_SUCCESS');
export const registerUserFailure = createAction('USER_REGISTER_FAILURE');

const api = axios.create({
  baseURL: 'http://conduit.productionready.io/api',
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Линтер ругается на изменение ключа объекта "no-param-reassign"
      // А как тогда по-другому добавить заголовок авторизации я не совсем понимаю
      config.headers.common.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const loginUser = (user) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const response = await api.post('/users/login', { user });
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
