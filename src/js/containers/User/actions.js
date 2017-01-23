import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export const userRequest = () => ({ 
  type: ActionTypes.USER_REQUEST
});

export const userSuccess = (passportUser) => { 
  console.log(passportUser);
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

const flattenUser = (user) => {
  const {
    contactByEmail,
    contactByMail,
    contactByPhone,
    firstName,
    lastName,
    localizationCode,
    preferredLanguage,
    residentCountryCode,
    securityLevel
  } = user.userDetails;

  return {
    contactByEmail,
    contactByMail,
    contactByPhone,
    emailAddress: user.userDetails.identity.emailAddress,
    firstName,
    lastName,
    localizationCode,
    preferredLanguage,
    profileId: user.userDetails.identity.profileId,
    residentCountryCode,
    userId: user.userDetails.identity.userId,
    securityLevel
  };
};
