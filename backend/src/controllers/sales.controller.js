const { salesService } = require('../services');

const getSales = async (_req, res) => {
  const { status, data } = await salesService.getSales();
  return res.status(status).json(data);
};

const getSaleById = async (req, res) => {
  const salesId = req.params.id;
  const { status, data } = await salesService.getSaleById(salesId);
  return res.status(status).json(data);
};

module.exports = {
  getSales,
  getSaleById,
};