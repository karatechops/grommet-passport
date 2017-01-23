import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import * as UserActions from '../User/actions';
import * as ActionTypes from './constants';

export const loginRequest = () => ({ 
  type: ActionTypes.LOGIN_REQUEST
});

export const loginSuccess = (user) => ({ 
  type: ActionTypes.LOGIN_SUCCESS,
  user
});

export const loginError = (error) => ({
  type: ActionTypes.LOGIN_ERROR,
  error
});

export const logoutSuccess = (user) => ({ 
  type: ActionTypes.LOGOUT_SUCCESS,
  user
});

export function login(user) {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(loginRequest());

    fetch(`${url}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
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
          return dispatch(loginError(error));
        }

        // Set session ID in cookie.
        const { sessionId } = json;
        cookie.save('GPsessionId', sessionId, { path: '/' });

        dispatch(loginSuccess(json));
        dispatch(UserActions.userSuccess(json));
        return browserHistory.push('/dashboard');
      }, (err) => {
        dispatch(loginError('There was an error processing your request.'));
      }
    );
  };
};

export function validateSession(sessionId) {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(loginRequest());

    fetch(`${url}/user/session`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ sessionId })
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
          return dispatch(loginError(error));
        }
        //cookie.load('sessionId');
        return dispatch(loginSuccess(json));
      }, (err) => {
        return dispatch(loginError('There was an error processing your request.'));
      }
    );
  };
}
