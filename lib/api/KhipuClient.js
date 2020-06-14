/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const Bank = require("./Bank");
const Payment = require("./Payment");
const PaymentMethod = require("./PaymentMethod");
const Utils = require("../utils");

const BASE_PATH = "khipu.com";
let CREDENTIALS = null;

/**
 * Khipu API client for nodejs.
 */
module.exports = {
  setAuthentication: (credentials) => {
    const [isValid, value] = Utils.areValidCredentials(credentials);
    if (!isValid) {
      throw value;
    }
    CREDENTIALS = value;
  },
  banks: {
    get: () => Bank.get(BASE_PATH, CREDENTIALS),
  },
  payments: {
    getByToken: (notificationToken) =>
      Payment.getByToken(notificationToken, BASE_PATH, CREDENTIALS),
    getById: (paymentId) => Payment.getById(paymentId, BASE_PATH, CREDENTIALS),
    create: (payment) => Payment.create(payment, BASE_PATH, CREDENTIALS),
    delete: (paymentId) => Payment.delete(paymentId, BASE_PATH, CREDENTIALS),
    createRefunds: (paymentId, amount) =>
      Payment.createRefunds(paymentId, amount, BASE_PATH, CREDENTIALS),
    createConfirm: (paymentId) =>
      Payment.createConfirm(paymentId, BASE_PATH, CREDENTIALS),
  },
  receivers: {
    create: () => {},
  },
  paymentMethods: {
    get: (receiverId) => PaymentMethod.get(receiverId, BASE_PATH, CREDENTIALS),
  },
};
