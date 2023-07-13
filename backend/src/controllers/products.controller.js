const { productsService } = require('../services');

const getProducts = async (_req, res) => {
  const { status, data } = await productsService.getProducts();
  return res.status(status).json(data);
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const { status, data } = await productsService.getProductById(productId);
  return res.status(status).json(data);
};

module.exports = {
  getProducts,
  getProductById,
};