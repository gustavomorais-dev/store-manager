const Joi = require('joi');

const productNameSchema = Joi.object({
  name: Joi.string().min(5),
});

const quantitySchema = Joi.number().integer().min(1);

module.exports = {
  productNameSchema,
  quantitySchema,
};
