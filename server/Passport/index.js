import request from 'request';
//import util from 'util';
import { parseString } from 'xml2js';
import * as PassportRequest from './requests';

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
      const body = PassportRequest.login({ username, password }, this.passportCreds);

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
      const body = PassportRequest.details(sessionId, this.passportCreds);
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
      const body = PassportRequest.createUser(user, this.passportCreds);
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
      const body = PassportRequest.validateSession(sessionId, this.passportCreds);
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
      const body = PassportRequest.securityQuestions(this.passportCreds.appId);
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
      const body = PassportRequest.recoverId(email);
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

  getGuidExp(guid) {
    return new Promise((resolve, reject) => {
      const body = PassportRequest.guidExp(guid);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:getGuidExpirationResponse'];
            
            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            resolve(soapResponse.profileIdentity);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  sendEmail(msg, userId) {
    return new Promise((resolve, reject) => {
      const body = PassportRequest.email(msg, userId);
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

            resolve(soapResponse);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  sendPasswordReset(msg) {
    return new Promise((resolve, reject) => {
      const body = PassportRequest.passwordResetEmail(msg);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:resetPasswordResponse'];

            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            resolve(soapResponse.profileIdentity);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }

  changePassword(guid, user) {
    return new Promise((resolve, reject) => {
      const body = PassportRequest.updateCredentials(guid, user);
      const requestParams = this._createReq(this.passportCreds, body);

      request.post(requestParams, (err, soapRes, body) => {
        if (err) {
          reject(err);
        }

        parseString(body, {explicitArray: false}, (err, result) => {
          if (result && result['SOAP-ENV:Envelope']) {
            const soapResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns3:updateCredentialsResponse'];

            if (soapResponse['exception'])
              reject(this._parseError(soapResponse['exception']));

            resolve(soapResponse.profileIdentity);
          } else {
            reject('Error processing request.');
          }
        });
      });
    });
  }
}
