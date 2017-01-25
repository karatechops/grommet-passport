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
