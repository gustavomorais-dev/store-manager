const { validateQuantity } = require('../services/validations/inputValues.validations');
const HTTP_STATUS = require('../utils/statusHTTP');

const validateUpdateSaleProductQuantityKeys = async (req, res, next) => {
  const saleDetails = req.body;
  
  const hasNotQuantity = !('quantity' in saleDetails);

  if (hasNotQuantity) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: '"quantity" is required',
    });
  }

  next();
};

const validateUpdateSaleProductQuantityValues = async (req, res, next) => {
  const saleDetails = req.body;

  const isInvalidQuantity = await validateQuantity(saleDetails.quantity);

  if (isInvalidQuantity) {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }

  next();
};

module.exports = {
  validateUpdateSaleProductQuantityKeys,
  validateUpdateSaleProductQuantityValues,
};