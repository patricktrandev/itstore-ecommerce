const express = require('express');
const app = express();

const { handleError } = require('./middleware/errors')

app.use(express.json())

const products = require('./routes/products')

app.use('/api/v1', products)

app.use(handleError)

module.exports = app