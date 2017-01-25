export const login = ({ username, password }, { appId }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
    <soapenv:Header/>\
     <soapenv:Body>\
        <pas:loginRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
           </requestContext>\
           <profileIdentity>\
              <userId>${username}</userId>\
           </profileIdentity>\
           <profileCredentials>\
              <currentPassword>${password}</currentPassword>\
           </profileCredentials>\
        </pas:loginRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
