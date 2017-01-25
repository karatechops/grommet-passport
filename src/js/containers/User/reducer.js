import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  errorQuestions: '',
  profileId: '',
  userId: '',
  emailAddress: '',
  firstName: '',
  lastName: '',
  preferredLanguage: 'en',
  residentCountryCode: 'US',
  securityLevel: '0',
  contactByEmail: 'N',
  contactByMail: 'N',
  contactByPhone: 'N',
  localizationCode: '2',
  questions: []
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
      return {
        ...state,
        request: false,
        error: '',
        ...action.user
      };
    case ActionTypes.USER_QUESTIONS_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        questions: action.questions.data
      };
    case ActionTypes.USER_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.USER_QUESTIONS_ERROR:
      return {
        ...state,
        request: false,
        errorQuestions: action.error
      };
    default:
      return state;
  }
}

export default user;
