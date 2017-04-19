export const rememberMeData = ({ appId }, rememberMeId) => 
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pas="http://hppws.globalops.hp.com/Passport">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <pas:getRememberMeDataRequest>\
         <requestContext>\
            <systemLanguageCode>en</systemLanguageCode>\
            <applicationId>${appId}</applicationId>\
         </requestContext>\
         <returnOptionalProfileDataFlag>true</returnOptionalProfileDataFlag>\
         <cookieData>${rememberMeId}</cookieData>\
      </pas:getRememberMeDataRequest>\
   </soapenv:Body>\
</soapenv:Envelope>`;
