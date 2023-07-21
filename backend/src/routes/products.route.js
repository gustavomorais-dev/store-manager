const route = require('express').Router();
const { productsController } = require('../controllers');
const {
validateUpdateProductKeys,
validateUpdateProductValues,
} = require('../middlewares/products.middlewares');

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductById);

route.post('/', productsController.createProduct);

route.put(
'/:id',
validateUpdateProductKeys,
validateUpdateProductValues,
productsController.updateProduct,
);

module.exports = route;