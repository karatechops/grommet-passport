import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  loggedIn: false,
  sessionId: ''
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
      const { sessionId } = action.user;
      console.log(action.user);
      return {
        ...state,
        request: false,
        loggedIn: true,
        error: '',
        sessionId: sessionId
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
        loggedIn: false,
        sessionId: ''
      };
    default:
      return state;
  }
}

export default login;
