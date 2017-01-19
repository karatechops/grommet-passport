import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import api from './api';
import login from '../containers/Login/reducer';

export default combineReducers({
  api,
  login,
  routing
});
