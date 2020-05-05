import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions'

const userAuth = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_ACTION':
      return !state;
    default:
      return state;
  }
};

export default combineReducers({ userAuth });