const route = require('express').Router();
const { salesController } = require('../controllers');
const {
  validateCreateSaleKeys,
  validateCreateSaleValues,
  validateCreateSaleDBValues,
} = require('../middlewares/sales.middlewares');

route.get('/', salesController.getSales);

route.get('/:id', salesController.getSaleById);

route.post(
'/',
validateCreateSaleKeys,
validateCreateSaleValues,
validateCreateSaleDBValues,
salesController.createSale,
);

route.delete('/:id', salesController.deleteSale);

module.exports = route;