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

const createSale = async (req, res) => {
  const saleDetails = req.body;
  const { status, data } = await salesService.createSale(saleDetails);
  return res.status(status).json(data);
};

const deleteSale = async (req, res) => {
  const saleId = req.params.id;
  const { status, data } = await salesService.deleteSale(saleId);
  return data ? res.status(status).json(data) : res.sendStatus(status);
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  deleteSale,
};