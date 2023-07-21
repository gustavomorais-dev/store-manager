const route = require('express').Router();
const { salesController, salesProductsController } = require('../controllers');
const {
  validateCreateSaleKeys,
  validateCreateSaleValues,
  validateCreateSaleDBValues,
} = require('../middlewares/sales.middlewares');
const {
validateUpdateSaleProductQuantityKeys,
validateUpdateSaleProductQuantityValues,
} = require('../middlewares/salesProducts.middlewares');

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

route.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSaleProductQuantityKeys,
  validateUpdateSaleProductQuantityValues,
  salesProductsController.updateSaleProductQuantity,
);

module.exports = route;