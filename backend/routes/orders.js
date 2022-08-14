const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const { createOrder, getMyOrder, getAllOrders, updateOrder, deleteOrder, getSingleOrder } = require('../controllers/orderController')

router.route('/orders/new').post(isAuthenticatedUser, authorizeRoles('user'), createOrder)

router.route('/orders/me').get(isAuthenticatedUser, getMyOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders)

router.route('/admin/orders/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
router.route('/admin/orders/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router