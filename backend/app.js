const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
const products = require('./routes/products')
const auth = require('./routes/user')
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
module.exports = app