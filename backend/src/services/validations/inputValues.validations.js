const HTTP_STATUS = require('../../utils/statusHTTP');
const { productNameSchema, quantitySchema } = require('./schemas');

const validateProductName = async (keysObjectToValidate) => {
  const { error } = productNameSchema.validate(keysObjectToValidate);
  const message = '"name" length must be at least 5 characters long';
  if (error) return { status: HTTP_STATUS.UNPROCESSABLE_ENTITY, message };
};

const validateQuantity = async (quantityToValidate) => {
  const { error } = quantitySchema.validate(quantityToValidate);
  const message = '"quantity" must be greater than or equal to 1';
  if (error) return { status: HTTP_STATUS.UNPROCESSABLE_ENTITY, message };
};

module.exports = {
  validateProductName,
  validateQuantity,
};
