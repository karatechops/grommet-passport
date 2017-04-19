export const rememberMeCookie = ({ appId }, sessionToken, profileId) => 
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <pas:getRememberMeCookieRequest>\
         <requestContext>\
            <sessionToken>${sessionToken}</sessionToken>\
            <systemLanguageCode>en</systemLanguageCode>\
              <applicationId>${appId}</applicationId>\
         </requestContext>\
         <profileIdentity>\
            <profileId>${profileId}</profileId>\
         </profileIdentity>\
      </pas:getRememberMeCookieRequest>\
   </soapenv:Body>\
</soapenv:Envelope>`;
