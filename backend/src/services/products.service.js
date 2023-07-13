const { productsModel } = require('../models');
const HTTP_STATUS = require('../utils/statusHTTP');

const getProducts = async () => {
  const products = await productsModel.findAll();
  return { status: HTTP_STATUS.OK, data: products };
};

const getProductById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Product not found' } };
  }

  return { status: HTTP_STATUS.OK, data: product };
};

module.exports = {
  getProducts,
  getProductById,
};