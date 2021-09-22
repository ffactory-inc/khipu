/**
 * @copyright FFactory 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const request = require('../utils/request');
const buildRequestOptions = require('../utils/buildRequestOptions');
const Utils = require('../utils');

const BANK_PATH = 'banks';

class Bank {
  /**
   * GET - Returns available banks.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static get(basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    const requestOptions = buildRequestOptions(
      basePath,
      BANK_PATH,
      'GET',
      {},
      null,
      value
    );
    return request(requestOptions);
  }
}

module.exports = Bank;
