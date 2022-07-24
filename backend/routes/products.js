const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { getProducts, addNewProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')


router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProduct)
router.route('/admin/products/new').post(addNewProduct)
router.route('/admin/products/:id').put(updateProduct)
router.route('/admin/products/:id').delete(deleteProduct)
module.exports = router