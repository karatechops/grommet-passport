export const checkUserId = (userId, { appId }) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:checkUserExistsRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
           </requestContext>\
           <profileIdentity>\
              <userId>${userId}</userId>\
           </profileIdentity>\
        </pas:checkUserExistsRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
