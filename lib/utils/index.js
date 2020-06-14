/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const querystring = require("querystring");
const crypto = require("crypto");
const HttpStatus = require("http-status-codes");
const CredentialSchema = require("../models/Crendetials");
const ValidationError = require("../models/ValidationError");

class Utils {
  /**
   * Returns Khipu API path.
   * @param {string} path - request path.
   * @param {*} queryParams - request query paramaters.
   */
  static getPathWithParams(path, queryParams) {
    if (queryParams && Object.keys(queryParams).length) {
      return `${path}?${querystring.stringify(queryParams)}`;
    }
    return path;
  }

  /**
   * Encrypts data using hmac 256 algorithm.
   * @param {string} secret - Khipu api secret.
   * @param {string} data - Data to encrypt.
   */
  static hmacSha256(secret, data) {
    const hmac = crypto.createHmac("sha256", secret);
    const hmacData = hmac.update(data);
    return hmacData.digest("hex");
  }

  /**
   * Generates authorization Khipu token.
   * @param {string} url - Khipu URL + path.
   * @param {string} method - Request method.
   * @param {Object} queryParams - Requets query parameters.
   * @param {Object} formParams - Requets form parameters.
   * @param {Object} credentials - Khipu api credentials.
   */
  static getAuthorizationHeader(
    url,
    method,
    queryParams,
    formParams,
    credentials
  ) {
    const params = {};
    for (let key in queryParams) {
      params[key] = queryParams[key].toString();
    }
    if (formParams) {
      for (let key in formParams) {
        params[key] = formParams[key].toString();
      }
    }

    let toSign = `${method}&${encodeURIComponent(url)}`;
    Object.keys(params)
      .sort()
      .forEach((key) => {
        toSign += `&${encodeURIComponent(key)}=${encodeURIComponent(
          params[key]
        )}`;
      });

    const hmac = Utils.hmacSha256(credentials.secret, toSign);
    return `${credentials.receiverId}:${hmac}`;
  }

  /**
   * Verifies if data is a JSON object.
   * @param {string} data - Data to verify if it is a JSON object.
   */
  static isJson(data) {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Mapped data to API DTO.
   * @param {Object} data - Data info to mapping.
   */
  static mapper(data) {
    const mappedData = {};
    for (let key in data) {
      const newKey = key
        .split(/(?=[A-Z])/)
        .map((item) => item.toLowerCase())
        .join("_");
      mappedData[newKey] = data[key];
    }
    return mappedData;
  }
  /**
   * Verify if the credential are defined and valid.
   * @param {CredentialSchema} credentials - Khipu authentication credentials.
   */
  static areValidCredentials(credentials) {
    if (!credentials) {
      const validationrError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Credentials should be defined."
      );
      return [false, validationrError];
    }
    const { error, value } = CredentialSchema.validate(credentials);
    if (error) {
      const validationrError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        error.message
      );
      return [false, validationrError];
    }
    return [true, value];
  }
}

module.exports = Utils;
