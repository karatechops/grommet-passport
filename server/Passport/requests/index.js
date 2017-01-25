export const loginBody = ({ username, password }, { appId }) =>
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

export const detailsBody = (sessionId, { appId }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:getUserRequest>\
           <requestContext>\
              <sessionToken>${sessionId}</sessionToken>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
           </requestContext>\
        </pas:getUserRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;

export const validateSessionBody = (sessionId, { appId }) => 
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:validateSessionRequest>\
           <requestContext>\
              <sessionToken>${sessionId}</sessionToken>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
           </requestContext>\
        </pas:validateSessionRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;

export const securityQuestionsBody = (applicationId) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:getSecurityQuestionsListRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>204736_BRANDCENTRAL2_ITG_HP</applicationId>\
           </requestContext>\
        </pas:getSecurityQuestionsListRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
