const { productsModel } = require('../models');
const { validateQuantity } = require('../services/validations/inputValues.validations');
const HTTP_STATUS = require('../utils/statusHTTP');

const validateCreateSaleKeys = async (req, res, next) => {
  const saleDetails = req.body;

  const hasNotProductId = saleDetails.some((sale) => !('productId' in sale));
  const hasNotQuantity = saleDetails.some((sale) => !('quantity' in sale));

  if (hasNotProductId) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: '"productId" is required',
    });
  }

  if (hasNotQuantity) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: '"quantity" is required',
    });
  }

  next();
};

const validateCreateSaleValues = async (req, res, next) => {
  const saleDetails = req.body;

  const promises = saleDetails.map(async (sale) => validateQuantity(sale.quantity));

  const isValidQuantity = await Promise.all(promises);

  if (isValidQuantity.some((result) => result)) {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }

  next();
};

const validateCreateSaleDBValues = async (req, res, next) => {
  const saleDetails = req.body;

  const promises = saleDetails.map(async (sale) => productsModel.findById(sale.productId));

  const productsFromDB = await Promise.all(promises);

  if (productsFromDB.some((product) => !product)) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: 'Product not found',
    });
  }

  next();
};

module.exports = {
  validateCreateSaleKeys,
  validateCreateSaleValues,
  validateCreateSaleDBValues,
};