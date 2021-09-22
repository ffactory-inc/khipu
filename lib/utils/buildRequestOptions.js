/**
 * @copyright FFactory 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const querystring = require('querystring');
const Utils = require('./index');

/**
 * Builds https requests configuration.
 * @param {string} hostname - API hostname.
 * @param {string} path - API path.
 * @param {string} method - API method.
 * @param {Object} queryParams - API query strings parametes.
 * @param {Object} postBody - API request body.
 * @param {Object} credentials - API authentication credentials.
 */
module.exports = (
  hostname,
  path,
  method,
  queryParams,
  postBody,
  credentials
) => {
  const authorization = Utils.getAuthorizationHeader(
    `https://${hostname}/api/2.0/${path}`,
    method,
    queryParams,
    postBody || {},
    credentials
  );
  return {
    hostname: hostname,
    path: Utils.getPathWithParams(`/api/2.0/${path}`, queryParams),
    port: 443,
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'node-client',
      Authorization: authorization,
    },
  };
};
