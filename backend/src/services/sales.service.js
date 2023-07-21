const { salesModel, salesProductsModel } = require('../models');
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

const createSale = async (saleDetails) => {
  const saleId = await salesModel.insert();
  const itemsSold = [];

  const promises = saleDetails.map(async (product) => {
    await salesProductsModel.insert({
      saleId,
      ...product,
    });
    itemsSold.push({ ...product });
  });

  await Promise.all(promises);
  
  const data = {
    id: saleId,
    itemsSold,
  };
  return { status: HTTP_STATUS.CREATED, data };
};

const deleteSale = async (saleId) => {
  let sale = await salesModel.findById(saleId);
  
  if (sale.length === 0) {
    return { status: HTTP_STATUS.NOT_FOUND, data: { message: 'Sale not found' } };
  }

  sale = await salesModel.deleteById(saleId);
  sale = await salesProductsModel.deleteById(saleId);

  return { status: HTTP_STATUS.NO_CONTENT, data: null };
};

module.exports = {
  getSales,
  getSaleById,
  createSale,
  deleteSale,
};