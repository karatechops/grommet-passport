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
