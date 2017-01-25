export const details = (sessionId, { appId }) =>
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
