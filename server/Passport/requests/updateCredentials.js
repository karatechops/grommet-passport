export const updateCredentials = (guid, { userId, password, passwordConfirm }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:updateCredentialsRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <version>2</version>\
           </requestContext>\
           <profileIdentity>\
              <userId>${userId}</userId>\
           </profileIdentity>\
           <profileCredentials>\
              <newPassword>${password}</newPassword>\
              <confirmPassword>${passwordConfirm}</confirmPassword>\
           </profileCredentials>\
           <guid>${guid}</guid>\
        </pas:updateCredentialsRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
