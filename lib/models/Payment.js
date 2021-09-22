/**
 * @copyright FFactory 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const Joi = require('@hapi/joi');

/**
 * Payment schema.
 */
const PaymentSchema = Joi.object({
  subject: Joi.string().required(),
  currency: Joi.string().required(),
  amount: Joi.number().required(),
  transactionId: Joi.string(),
  custom: Joi.string(),
  body: Joi.string(),
  bankId: Joi.string(),
  returnUrl: Joi.string().uri(),
  cancelUrl: Joi.string().uri(),
  pictureUrl: Joi.string().uri(),
  notifyUrl: Joi.string().uri(),
  contractUrl: Joi.string().uri(),
  notifyApiVersion: Joi.string(),
  expiresDate: Joi.string().isoDate(),
  sendEmail: Joi.string().email(),
  payerName: Joi.string(),
  payerEmail: Joi.string().email(),
  sendReminders: Joi.boolean(),
  responsibleUserEmail: Joi.string().email(),
  fixedPayerPersonalIdentifier: Joi.string(),
  integrator_fee: Joi.string(),
  collect_account_uuid: Joi.string().guid({
    version: ['uuidv4', 'uuidv5'],
  }),
  confirmTimeoutDate: Joi.string().isoDate(),
});

module.exports = PaymentSchema;
