/**
 * @copyright FFactory 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const https = require('https');
const HttpStatus = require('http-status-codes');
const querystring = require('querystring');
const Utils = require('./index');
const ValidationError = require('../models/ValidationError');
const RequestSchema = require('../models/Request');

/**
 * Sends https request to khipu API.
 * @param {RequestSchema} requestOptions - Request option.
 * @param {Object} data - Data to request body.
 */
function request(requestOptions, data = null) {
  return new Promise((resolve, reject) => {
    const { error } = RequestSchema.validate(requestOptions);
    if (error) {
      return reject(new ValidationError(HttpStatus.BAD_REQUEST, error.message));
    }
    let postData;
    if (data) {
      postData = querystring.stringify(data);
      requestOptions.headers['Content-Length'] = postData.length;
    }
    const req = https.request(requestOptions, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        if (Utils.isJson(rawData)) {
          const parsedData = JSON.parse(rawData);
          if (parsedData.hasOwnProperty('status')) {
            if (
              HttpStatus.BAD_REQUEST.toString() == parsedData.status ||
              HttpStatus.FORBIDDEN.toString() == parsedData.status ||
              HttpStatus.SERVICE_UNAVAILABLE.toString() == parsedData.status
            ) {
              reject(parsedData);
              return;
            }
          }
          parsedData.status = HttpStatus.OK;
          resolve(parsedData);
        } else {
          const valitationError = new ValidationError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            rawData
          );
          reject(valitationError);
        }
      });
    });
    req.on('error', (e) => {
      e.status = HttpStatus.INTERNAL_SERVER_ERROR;
      reject(e);
    });
    // Write data to request body
    if (postData) req.write(postData);
    req.end();
  });
}

module.exports = request;
