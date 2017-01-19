import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  loggedIn: false
};

function login(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        request: true,
        error: ''
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        request: false,
        loggedIn: true,
        error: ''
      };
    case ActionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        loggedIn: false
      };
    default:
      return state;
  }
}

export default login;
