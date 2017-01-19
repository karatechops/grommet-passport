import request from 'request';
import util from 'util';
import { parseString } from 'xml2js';
import { loginBody } from './requests';

export default class Passport {
  constructor({ url, username, password}) {
    this.passportCreds = {
      url,
      username,
      password
    };
  }

  createReqHeader({username, password}, body) {
    return {
      "Authorization": "Basic " + new Buffer(username + ":" + password).toString("base64"),
      "Content-Length": Buffer.byteLength(body),
      "Content-Type": "text/xml"
    };
  }

  userLogin({ username, password }) {
    return new Promise((resolve, reject) => {
      const body = loginBody({ username, password });

      const requestParams = {
        url: this.passportCreds.url,
        headers: this.createReqHeader(this.passportCreds, body),
        body
      };

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


  isError() {
    // WIP
    return('no');
  }
}
