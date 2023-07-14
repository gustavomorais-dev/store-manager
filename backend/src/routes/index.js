const express = require('express');
const productsRoutes = require('./products.route');
const salesRoutes = require('./sales.route');

const router = express.Router();

router.use('/products', productsRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
