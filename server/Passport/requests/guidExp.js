export const guidExp = (guid) => 
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:getGuidExpirationRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <version>2</version>\
           </requestContext>\
           <guid>${guid}</guid>\
        </pas:getGuidExpirationRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
