/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

class ValidationError {
  /**
   *
   * @param {number} status - Error status.
   * @param {string} message - Error messages.
   * @param {Array<Object>} errors - Validation errors.
   */
  constructor(status, message, errors = null) {
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

module.exports = ValidationError;
