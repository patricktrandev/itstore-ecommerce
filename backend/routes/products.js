const express = require('express');
const { route } = require('../app');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router();

const { getProducts, addNewProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')


router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProduct)
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), addNewProduct)
router.route('/admin/products/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
router.route('/admin/products/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
module.exports = router