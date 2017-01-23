import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  profileId: '',
  userId: '',
  emailAddress: '',
  firstName: '',
  lastName: '',
  preferredLanguage: '',
  residentCountryCode: '',
  securityLevel: '0',
  contactByEmail: 'N',
  contactByMail: 'N',
  contactByPhone: 'N',
  localizationCode: '2'
};

function user(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.USER_REQUEST:
      return {
        ...state,
        request: true,
        error: ''
      };
    case ActionTypes.USER_SUCCESS:
      console.log(action.user);
      return {
        ...state,
        request: false,
        error: '',
        ...action.user
      };
    case ActionTypes.USER_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default user;
