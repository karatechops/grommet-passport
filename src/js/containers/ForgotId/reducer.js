import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  profileId: ''
};

function forgotId(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.FORGOT_ID_REQUEST:
      return {
        ...state,
        request: true,
        error: ''
      };
    case ActionTypes.FORGOT_ID_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.FORGOT_ID_SUCCESS:
      return {
        ...state,
        request: false,
        ...action.user.data.profileIdentity
      };
    default:
      return state;
  }
}

export default forgotId;
