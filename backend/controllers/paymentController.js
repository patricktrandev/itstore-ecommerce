const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// Process stripe payments   =>   /api/v1/payment/process
const processStripePayment = catchAsyncErrors(async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',

            metadata: { integration_check: 'accept_a_payment' }
        })

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            isSuccess: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }

})

// Send stripe API Key   =>   /api/v1/stripeapi
const sendStripeApi = catchAsyncErrors(async (req, res, next) => {


    try {
        console.log("stripe api", process.env.STRIPE_API_KEY)
        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            isSuccess: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }
})
module.exports = {
    processStripePayment,
    sendStripeApi
}