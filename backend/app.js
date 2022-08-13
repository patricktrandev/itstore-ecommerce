const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())
const products = require('./routes/products')
const auth = require('./routes/user')
const order = require('./routes/orders')
const payment = require('./routes/payment')


dotenv.config({ path: 'backend/config/config.env' })




app.use(function (err, req, res, next) {
    // No routes handled the request and no system error, that means 404 issue.
    // Forward to next middleware to handle it.
    if (!err) return next();

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    })
})
//render page not found
// catch 404. 404 should be consider as a default behavior, not a system error.
// app.use(function (req, res, next) {
//     console.log(">>>here")
//     res.status(404).json({
//         success: false,
//         error: 'Not found',
//     });

// });
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)
module.exports = app