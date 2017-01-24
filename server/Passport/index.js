import request from 'request';
//import util from 'util';
import { parseString } from 'xml2js';
import { 
  loginBody, 
  detailsBody, 
  validateSessionBody 
} from './requests';

export default class Passport {
  constructor({ url, username, password, appId}) {
    this.passportCreds = {
      url,
      username,
      password,
      appId
    };
  }

  _createReqHeader({username, password}, body) {
    return {
      "Authorization": "Basic " + new Buffer(username + ":" + password).toString("base64"),
      "Content-Length": Buffer.byteLength(body),
      "Content-Type": "text/xml"
    };
  }

  _createReq(passportCreds, body) {
    const request = {
      url: passportCreds.url,
      headers: this._createReqHeader(passportCreds, body),
      body
    };

    return request;
  }

  userLogin({ username, password }) {
    return new Promise((resolve, reject) => {
      const body = loginBody({ username, password }, this.passportCreds);

      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, function (err, result) {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:loginResponse'];
            
            if (soapResponse['exception']) {
              const errMsg = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:loginResponse']['exception']['faults']['faultMessage'];
              reject(errMsg);
            }

            const { sessionToken } = soapResponse;
            resolve(sessionToken);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  userDetails(sessionId) {
    return new Promise((resolve, reject) => {
      const body = detailsBody(sessionId, this.passportCreds);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, function (err, result) {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:getUserResponse'];
            //console.log(util.inspect(soapResponse, false, null));
            
            if (soapResponse['exception']) {
              const errMsg = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:getUserResponse']['exception']['faults']['faultMessage'];
              reject(errMsg);
            }

            const userDetails = { 
              sessionId,
              userDetails: soapResponse.coreProfile, 
              userOptionalDetails: soapResponse.extendedProfile
            };

            resolve(userDetails);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  validateSession(sessionId) {
    return new Promise((resolve, reject) => {
      const body = validateSessionBody(sessionId, this.passportCreds);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, function (err, result) {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:validateSessionResponse'];
            
            if (soapResponse['exception']) {
              const errMsg = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:validateSessionResponse']['exception']['faults']['faultMessage'];
              reject(errMsg);
            }

            const { userId } = soapResponse;

            resolve(userId);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }


  isError() {
    // WIP
    return('no');
  }
}
