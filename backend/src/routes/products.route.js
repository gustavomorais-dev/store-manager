const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getProducts);

route.get('/:id', (req, res) => productsController.getProductById(req, res));

module.exports = route;