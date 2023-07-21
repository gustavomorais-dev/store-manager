const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getProducts);

route.get('/:id', productsController.getProductById);

route.post('/', productsController.createProduct);

module.exports = route;