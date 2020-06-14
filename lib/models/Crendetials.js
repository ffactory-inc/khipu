/**
 * @copyright Tuttis 2020. All Rights Reserved.
 * Application: khipu rest client.
 */

const Joi = require("@hapi/joi");

/**
 * Credential schema.
 */
const CredentialSchema = Joi.object({
  secret: Joi.string().required(),
  receiverId: Joi.string().required(),
});

module.exports = CredentialSchema;
