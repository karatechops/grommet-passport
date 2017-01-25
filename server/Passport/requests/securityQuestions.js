export const securityQuestions = (applicationId) =>
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
