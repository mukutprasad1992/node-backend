const Joi = require("joi");
const Schemas = {
  users: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  // ToDo Others Schemas Validator
};
module.exports = Schemas;
