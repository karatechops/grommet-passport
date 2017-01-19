export const loginBody = ({ username, password }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
    <soapenv:Header/>\
     <soapenv:Body>\
        <pas:loginRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>204736_BRANDCENTRAL2_ITG_HPE</applicationId>\
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
