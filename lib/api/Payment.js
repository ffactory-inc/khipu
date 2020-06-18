/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const HttpStatus = require('http-status-codes');
const request = require('../utils/request');
const buildRequestOptions = require('../utils/buildRequestOptions');
const ValidationError = require('../models/ValidationError');
const PaymentSchema = require('../models/Payment');
const Utils = require('../utils');

const PAYMENT_PATH = 'payments';

class Payment {
  /**
   * GET - Returns Complete payment information.
   * Data with which it was created and the current status of the payment.
   * Obtained from the notification_token that khipu sends when payment is reconciled.
   * @param {string} notificationToken - Notification token.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static getByToken(notificationToken, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!notificationToken) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'notificationToken'"
      );
      return Promise.reject(validationError);
    }
    const requestOptions = buildRequestOptions(
      basePath,
      PAYMENT_PATH,
      'GET',
      { notification_token: notificationToken },
      null,
      value
    );
    return request(requestOptions);
  }
  /**
   * GET - Returns the complete Payment Information.
   * Data with which it was created and the current status of the payment.
   * @param {string} paymentId - Payment identifier.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static getById(paymentId, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!paymentId) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'paymentId'"
      );
      return Promise.reject(validationError);
    }
    const path = `${PAYMENT_PATH}/${paymentId}`;
    const requestOptions = buildRequestOptions(
      basePath,
      path,
      'GET',
      {},
      null,
      value
    );
    return request(requestOptions);
  }
  /**
   * POST - Create a payment in khipu and get the URLs to redirect the user to complete the payment.
   * @param {PaymentSchema} payment - Data to create a payment.
   * - subject - Reason for collecting money.
   * - currency - The currency code in ISO-4217 format.
   * - mount - The amount of the collection.
   * - transactionId - Identifier of the transaction. Ex: invoice number or purchase order.
   * - custom - Parameter to send personalized information of the transaction. Ex: XML document with the detail of the shopping cart.
   * - body - Payment description.
   * - bankId - Bank identifier to use for payment.
   * - returnUrl - The URL to which to send the customer while the payment is being verified.
   * - cancelUrl - The URL to which to send the client if he decides not to make the transaction.
   * - pictureUrl - A URL of a photo of your product or service.
   * - notifyUrl - The address of the web-service that khipu will use to notify when the payment is reconciled.
   * - contractUrl - The URL of the PDF file with the contract to be signed by this payment.
   * - fixedPayerPersonalIdentifier - Personal identifier. If specified, it can only be paid using that identifier.
   * - notifyApiVersion - Notification API version to receive alerts by web-service.
   * - expiresDate - Collection expiration date. After this date the payment is invalid. ISO-8601 format.
   * - sendEmail - If true, a billing request will be sent to the email specified in payerEmail.
   * - payerEmail - Correo del pagador. Es obligatorio cuando sendEmail es true.
   * - payerName - Payer's name. It is mandatory when sendEmail is true.
   * - sendReminders - If true, collection reminders will be sent.
   * - responsibleUserEmail - Email of the person in charge of this collection, must correspond to a khipu user with permissions to collect using this collection account.
   * - integratorFee - Commission for the integrator. Only valid if the collection account has an associated integrator account.
   * - collectAccountUuid - For collection accounts with more own account. Allows you to choose the account where the transfer should occur.
   * - confirmTimeoutDate - Collection surrender date. It is also the final date to be able to reimburse the collection. ISO-8601 format.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static create(payment, basePath, credentials) {
    const [isValid, validCredentials] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(validCredentials);
    }
    const { error, value } = PaymentSchema.validate(payment);
    if (error) {
      return Promise.reject(
        new ValidationError(HttpStatus.BAD_REQUEST, error.message)
      );
    }
    const requestBody = Utils.mapper(value);
    const requestOptions = buildRequestOptions(
      basePath,
      PAYMENT_PATH,
      'POST',
      {},
      requestBody,
      validCredentials
    );
    console.log(requestOptions, requestBody);
    return request(requestOptions, requestBody);
  }
  /**
   * DELETE - removes a payment.
   * It only is possible to delete payments that are pending.
   * This operation cannot be undone.
   * @param {string} paymentId - Payment identifier.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static delete(paymentId, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!paymentId) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'paymentId'"
      );
      return Promise.reject(validationError);
    }
    const path = `${PAYMENT_PATH}/${paymentId}`;
    const requestOptions = buildRequestOptions(
      basePath,
      path,
      'DELETE',
      {},
      null,
      value
    );
    return request(requestOptions);
  }
  /**
   * Fully or partially refund the amount of a payment.
   * This operation can only be carried out in businesses that collect on a khipu account
   * and before the corresponding funds are surrendered.
   * @param {string} paymentId - Payment identifier.
   * @param {number} amount - Amount to return.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static createRefunds(paymentId, amount, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!paymentId) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'paymentId'"
      );
      return Promise.reject(validationError);
    }

    const path = `${PAYMENT_PATH}/${paymentId}/refunds`;
    const requestBody = amount ? { amount: amount } : {};
    const requestOptions = buildRequestOptions(
      basePath,
      path,
      'POST',
      {},
      requestBody,
      value
    );
    return request(requestOptions, requestBody);
  }
  /**
   * Confirm the payment.
   * When confirming the payment, it will be paid the next day.
   * @param {string} paymentId - Payment identifier.
   * @param {string} basePath - API base path.
   * @param {Object} credentials - API authentication credentials.
   */
  static createConfirm(paymentId, basePath, credentials) {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      return Promise.reject(value);
    }
    if (!paymentId) {
      const validationError = new ValidationError(
        HttpStatus.BAD_REQUEST,
        "Missing the required parameter 'paymentId'"
      );
      return Promise.reject(validationError);
    }

    const path = `${PAYMENT_PATH}/${paymentId}/confirm`;
    const requestOptions = buildRequestOptions(
      basePath,
      path,
      'POST',
      {},
      {},
      value
    );
    return request(requestOptions, {});
  }
}
module.exports = Payment;
