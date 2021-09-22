/**
 * @copyright FFactory 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const Joi = require('@hapi/joi');

/**
 * Request schema.
 */
const RequestSchema = Joi.object({
  hostname: Joi.string().domain().required(),
  path: Joi.string().required(),
  port: Joi.number().required(),
  method: Joi.any().valid('POST', 'GET', 'DELETE').required(),
  headers: Joi.object().keys({
    Accept: Joi.string().required(),
    'Content-Type': Joi.string().required(),
    'User-Agent': Joi.string().required(),
    Authorization: Joi.string().required(),
  }),
});

module.exports = RequestSchema;
