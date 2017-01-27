import * as ActionTypes from './constants';
// Passport should have a webpack alias.
import { flattenUser } from '../../../../server/Passport/utils';

export const userRequest = () => ({ 
  type: ActionTypes.USER_REQUEST
});

export const userSuccess = (passportUser) => {
  const user = flattenUser(passportUser);
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

        // Passport only returns profile ID, user ID, and email upon user creating
        // we can fill in the gaps with our form state.
        const { 
          firstName, lastName, preferredLanguage, residentCountryCode, 
          contactByEmail 
        } = data;
        const user = {
          profileId: json.profileId,
          userId: json.userId,
          emailAddress: json.emailAddress,
          firstName,
          lastName, 
          preferredLanguage, 
          residentCountryCode, 
          contactByEmail
        };

        return dispatch(userSuccess(user));
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
