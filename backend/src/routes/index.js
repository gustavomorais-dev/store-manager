const express = require('express');
const productsRoutes = require('./products.route');

const router = express.Router();

router.use('/products', productsRoutes);

module.exports = router;
