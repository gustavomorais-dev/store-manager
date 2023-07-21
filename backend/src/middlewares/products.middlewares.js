const { validateProductName } = require('../services/validations/inputValues.validations');
const HTTP_STATUS = require('../utils/statusHTTP');

const validateUpdateProductKeys = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const message = '"name" is required';
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message,
    });
  }

  next();
};

const validateUpdateProductValues = async (req, res, next) => {
  const { name } = req.body;

  const validationError = await validateProductName({ name });
  if (validationError) {
    return res.status(validationError.status).json({
      message: validationError.message,
    });
  }

  next();
};

module.exports = {
  validateUpdateProductKeys,
  validateUpdateProductValues,
};