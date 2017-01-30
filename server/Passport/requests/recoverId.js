export const recoverId = (email) => 
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:recoverUserIdRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
           </requestContext>\
           <profileIdentity>\
              <emailAddress>${email}</emailAddress>\
           </profileIdentity>\
        </pas:recoverUserIdRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
