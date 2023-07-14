const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getSales);

route.get('/:id', (req, res) => salesController.getSaleById(req, res));

module.exports = route;