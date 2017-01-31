import * as ActionTypes from './constants';

export const forgotPasswordRequest = () => ({ 
  type: ActionTypes.FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = (user) => {
  return {
    type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
    user 
  };
};

export const forgotPasswordError = (error) => ({
  type: ActionTypes.FORGOT_PASSWORD_ERROR,
  error
});

export const submitRequest = (data) => {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(forgotPasswordRequest());

    return fetch(`${url}/user/reset-password`, {
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
          return dispatch(forgotPasswordError(error));
        }
        
        return dispatch(forgotPasswordSuccess(json));
      }, (err) => {
        return dispatch(forgotPasswordError('There was an error processing your request.'));
      }
    );
  };
};
