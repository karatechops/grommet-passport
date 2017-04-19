export const flattenUser = (user) => {
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

export const flattenTokenUser = (user) => {
  const {
    firstName,
    lastName,
    localizationCode,
    preferredLanguage,
    residentCountryCode,
    securityLevel
  } = user;

  return {
    contactByEmail: 'Y',
    contactByMail: 'N',
    contactByPhone: 'N',
    emailAddress: user.identity.emailAddress,
    firstName,
    lastName,
    localizationCode,
    preferredLanguage,
    profileId: user.identity.profileId,
    residentCountryCode,
    userId: user.identity.userId,
    securityLevel
  };
};

export const debug = (location, error) => {
  if (process.env.DEBUG) 
    console.log('[API Error]', location, error);
};
