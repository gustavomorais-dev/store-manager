const { salesProductsService } = require('../services');

const updateSaleProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await salesProductsService
    .updateSaleProductQuantity(saleId, productId, quantity);

  return res.status(status).json(data);
};

module.exports = {
  updateSaleProductQuantity,
};