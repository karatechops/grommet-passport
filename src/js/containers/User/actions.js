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
