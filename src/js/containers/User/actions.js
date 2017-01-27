import { browserHistory } from 'react-router';
import * as ActionTypes from './constants';
import { loginSuccess } from '../Login/actions';

export const userRequest = () => ({ 
  type: ActionTypes.USER_REQUEST
});

export const userSuccess = (user) => {
  //const user = flattenUser(passportUser);
  return {
    type: ActionTypes.USER_SUCCESS,
    user 
  };
};

export const userQuestionsSuccess = (questions) => ({
  type: ActionTypes.USER_QUESTIONS_SUCCESS,
  questions
});

export const userQuestionsError = (error) => ({
  type: ActionTypes.USER_QUESTIONS_ERROR,
  error
});

export const userError = (error) => ({
  type: ActionTypes.USER_ERROR,
  error
});

export function userCreate(data) {
  return(dispatch, getState) => {
    const { url } = getState().api;
    dispatch(userRequest());

    fetch(`${url}/user/create`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then((response) =>
        response.json().then((json) => ({
          status: response.status,
          statusText: response.statusText,
          json
        }))
      )
      .then(({ status, statusText, json }) => {
        if (status >= 400) {
          const error = json.error || 'There was an error processing your request.';
          return dispatch(userError(error));
        }

        console.log('json',json);
        // Passport only returns profile ID, user ID, and email upon user creating
        // we can fill in the gaps with our form state.
        const { 
          firstName, lastName, contactByEmail 
        } = data;
        const user = {
          profileId: json.profileId,
          userId: json.userId,
          emailAddress: json.emailAddress,
          firstName,
          lastName, 
          preferredLanguage: data.preferredLanguage.value, 
          residentCountryCode: data.residentCountryCode.value, 
          contactByEmail
        };

        console.log('user', user);
        // The server automatically logs in a user when a profile is created.
        dispatch(loginSuccess({ sessionId: json.sessionId }));
        dispatch(userSuccess(user));
        return browserHistory.push('/dashboard');
      }, (err) => {
        return dispatch(userError('There was an error processing your request.'));
      }
    );
  };
}

export function getUserQuestions() {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(userRequest());

    fetch(`${url}/user/security-questions`, {
      method: 'GET',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) =>
        response.json().then((json) => ({
          status: response.status,
          statusText: response.statusText,
          json
        }))
      )
      .then(({ status, statusText, json }) => {
        if (status >= 400) {
          const error = json.error || 'There was an error processing your request.';
          return dispatch(userQuestionsError(error));
        }

        return dispatch(userQuestionsSuccess(json));
      }, (err) => {
        return dispatch(userQuestionsError('There was an error processing your request.'));
      }
    );
  };
}
