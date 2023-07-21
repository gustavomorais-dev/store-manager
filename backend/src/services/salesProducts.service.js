const { salesProductsModel, productsModel, salesModel } = require('../models');
const HTTP_STATUS = require('../utils/statusHTTP');

const updateSaleProductQuantity = async (saleId, productId, newQuantity) => {
  const product = await productsModel.findById(productId);

  if (!product) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Product not found in sale' } };
  }

  const sale = await salesModel.findById(saleId);

  if (sale.length === 0) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Sale not found' } };
  }

  const result = await salesProductsModel.updateByIds(saleId, productId, newQuantity);

  return { status: HTTP_STATUS.OK, data: result };
};

module.exports = {
  updateSaleProductQuantity,
};