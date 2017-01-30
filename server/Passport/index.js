import request from 'request';
//import util from 'util';
import { parseString } from 'xml2js';
import {
  createUser,
  email,
  login, 
  details, 
  validateSession,
  recoverId,
  securityQuestions
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

  _parseError(soapResponse) {
    if (Array.isArray(soapResponse['faults']))
      return soapResponse['faults'][0]['faultMessage'];
    else
      return soapResponse['faults']['faultMessage'];
  }

  userLogin({ username, password }) {
    return new Promise((resolve, reject) => {
      const body = login({ username, password }, this.passportCreds);

      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:loginResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

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
      const body = details(sessionId, this.passportCreds);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:getUserResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

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

  userCreate(user) {
    return new Promise((resolve, reject) => {
      const body = createUser(user, this.passportCreds);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:createUserResponse'];

            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            const userDetails = soapResponse['profileIdentity'];
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
      const body = validateSession(sessionId, this.passportCreds);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:validateSessionResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            const { userId } = soapResponse;

            resolve(userId);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  getSecurityQuestions() {
    return new Promise((resolve, reject) => {
      const body = securityQuestions(this.passportCreds.appId);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:getSecurityQuestionsListResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            const { securityQuestions } = soapResponse;
            let appSecurityQuestions = [];

            // This makes it easier to map these to Select components.
            securityQuestions.forEach(({ id, question }) => {
              appSecurityQuestions.push({
                value: id,
                label: question
              });
            });

            resolve(appSecurityQuestions);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  getUserId(email) {
    return new Promise((resolve, reject) => {
      const body = recoverId(email);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:recoverUserIdResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            const { userId } = soapResponse.profileIdentity;

            resolve(userId);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  sendEmail(msg, userId) {
    return new Promise((resolve, reject) => {
      const body = email(msg, userId);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:sendEmailResponse'];

            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            const { profileId } = soapResponse.profileIdentity;

            resolve(profileId);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }
}
