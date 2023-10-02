const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getAllProductsStatic
} = require('../controllers/productsController');

router.get('/', getAllProducts);
router.get('/static', getAllProductsStatic);

module.exports = router;