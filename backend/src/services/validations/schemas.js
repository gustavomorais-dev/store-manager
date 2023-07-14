const Joi = require('joi');

const productNameSchema = Joi.object({
  name: Joi.string().min(5),
});

module.exports = {
  productNameSchema,
};