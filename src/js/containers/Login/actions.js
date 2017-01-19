import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export const loginRequest = () => ({ 
  type: ActionTypes.USER_LOGIN_REQUEST
});

export const loginSuccess = (user) => ({ 
  type: ActionTypes.USER_LOGIN_SUCCESS,
  user
});

export const loginError = (error) => ({
  type: ActionTypes.USER_LOGIN_ERROR,
  error
});

export const logoutSuccess = (user) => ({ 
  type: ActionTypes.USER_LOGOUT_SUCCESS,
  user
});

export function login({username, password}) {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(loginRequest());

    fetch(`${url}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ username, password })
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

        return dispatch(loginSuccess(json));
      }, (err) =>
        dispatch(loginError('There was an error processing your request.'))
      );
  };
};
