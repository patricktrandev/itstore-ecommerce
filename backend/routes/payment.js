const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { isAuthenticatedUser } = require('../middleware/auth')
const { processStripePayment, sendStripeApi } = require('../controllers/paymentController')

router.route('/payment/process').post(isAuthenticatedUser, processStripePayment)
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi)
module.exports = router