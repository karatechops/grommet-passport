import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from './api';
import login from '../containers/Login/reducer';
import user from '../containers/User/reducer';

export default combineReducers({
  api,
  login,
  user,
  routing
});
