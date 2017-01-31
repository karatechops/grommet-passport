import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import api from './api';
import login from '../containers/Login/reducer';
import user from '../containers/User/reducer';
import forgotId from '../containers/ForgotId/reducer';

export default combineReducers({
  api,
  login,
  user,
  forgotId,
  routing,
  form: formReducer
});
