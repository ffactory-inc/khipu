/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const HttpStatus = require("http-status-codes");
const request = require("../utils/request");
const buildRequestOptions = require("../utils/buildRequestOptions");
const ValidationError = require("../models/ValidationError");
const Utils = require("../utils");

const RECEIVER_PATH = "merchants";

class PaymentMethod {
  /**
   * GET - Returns the list of payment methods available for a collector account.
   * @param {string} receiverId - collector account id.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static get(receiverId, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!receiverId) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'receiverId'"
      );
      return Promise.reject(validationError);
    }
    const path = `${RECEIVER_PATH}/${receiverId}/paymentMethods`;
    const requestOptions = buildRequestOptions(
      basePath,
      path,
      "GET",
      {},
      null,
      value
    );
    return request(requestOptions);
  }
}

module.exports = PaymentMethod;
