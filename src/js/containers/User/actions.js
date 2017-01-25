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

export const userError = (error) => ({
  type: ActionTypes.USER_ERROR,
  error
});
