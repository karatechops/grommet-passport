import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  profileId: ''
};

function forgotPassword(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        request: true,
        error: ''
      };
    case ActionTypes.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        request: false,
        ...action.user.data
      };
    default:
      return state;
  }
}

export default forgotPassword;
