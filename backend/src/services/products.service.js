const { productsModel } = require('../models');
const HTTP_STATUS = require('../utils/statusHTTP');
const { validateProductName } = require('./validations/inputValues.validations');

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

const createProduct = async (productName) => {
  if (!productName) {
    const message = '"name" is required';
    return { status: HTTP_STATUS.BAD_REQUEST, data: { message } };
  }

  const validationError = await validateProductName({ name: productName });
  if (validationError) {
    return { status: validationError.status, data: { message: validationError.message } };
  }

  const product = await productsModel.insert(productName);

  return { status: HTTP_STATUS.CREATED, data: product };
};

const updateProduct = async (productId, newName) => {
  let product = await productsModel.findById(productId);

  if (!product) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Product not found' } };
  }

  product = await productsModel.updateById(productId, newName);

  return { status: HTTP_STATUS.OK, data: product };
};

const deleteProduct = async (productId) => {
  let product = await productsModel.findById(productId);

  if (!product) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Product not found' } };
  }

  product = await productsModel.deleteById(productId);

  return { status: HTTP_STATUS.NO_CONTENT, data: null };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};