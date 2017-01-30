export const email = ({ to, from, replyTo, subject, body }, userId) =>
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:sendEmailRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
           </requestContext>\
           <profileIdentity>\
              <userId>${userId}</userId>\
           </profileIdentity>\
           <emailTemplates>\
              <body>${body}</body>\
              <subject>${subject}</subject>\
              <fromAddress>${from}</fromAddress>\
              <replyTo>${replyTo}</replyTo>\
              <toAddresses>${to}</toAddresses>\
              <templateType>WELCOME</templateType>\
              <isHTML>true</isHTML>\
           </emailTemplates>\
        </pas:sendEmailRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
