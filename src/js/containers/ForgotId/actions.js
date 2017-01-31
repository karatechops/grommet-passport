import * as ActionTypes from './constants';

export const forgotIdRequest = () => ({ 
  type: ActionTypes.FORGOT_ID_REQUEST
});

export const forgotIdSuccess = (user) => {
  return {
    type: ActionTypes.FORGOT_ID_SUCCESS,
    user 
  };
};

export const forgotIdError = (error) => ({
  type: ActionTypes.FORGOT_ID_ERROR,
  error
});

export const submitRequest = (data) => {
  return (dispatch, getState) => {
    const { url } = getState().api;

    dispatch(forgotIdRequest());

    return fetch(`${url}/user/forgot-id`, {
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
          return dispatch(forgotIdError(error));
        }

        return dispatch(forgotIdSuccess(json));
      }, (err) => {
        return dispatch(forgotIdError('There was an error processing your request.'));
      }
    );
  };
};
