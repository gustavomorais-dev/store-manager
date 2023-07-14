const { salesModel } = require('../models');
const HTTP_STATUS = require('../utils/statusHTTP');

const getSales = async () => {
  const sales = await salesModel.findAll();
  return { status: HTTP_STATUS.OK, data: sales };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (!sale || sale.length === 0) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Sale not found' } };
  }

  return { status: HTTP_STATUS.OK, data: sale };
};

module.exports = {
  getSales,
  getSaleById,
};