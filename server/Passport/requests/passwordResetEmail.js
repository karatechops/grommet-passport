export const passwordResetEmail = ({ to, from, replyTo, subject, body }) => 
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
     <soapenv:Header/>\
     <soapenv:Body>\
        <pas:resetPasswordRequest>\
           <requestContext>\
              <systemLanguageCode>en</systemLanguageCode>\
              <version>2</version>\
           </requestContext>\
           <emailTemplates>\
              <templateType>WELCOME_EXP_GUID</templateType>\
              <body>${body}</body>\
              <subject>${subject}</subject>\
              <fromAddress>${from}</fromAddress>\
              <replyTo>${replyTo}</replyTo>\
              <toAddresses>${to}</toAddresses>\
              <isHTML>true</isHTML>\
           </emailTemplates>\
           <profileIdentity>\
              <emailAddress>${to}</emailAddress>\
           </profileIdentity>\
           <checkIsprEligibilityFlag>true</checkIsprEligibilityFlag>\
        </pas:resetPasswordRequest>\
     </soapenv:Body>\
  </soapenv:Envelope>`;
