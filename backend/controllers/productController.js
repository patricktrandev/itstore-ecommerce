const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const getProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        isSuccess: true,
        count: products.length,
        products
    })
})

//get single product
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;
    try {

        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler('Product has not found...', 404))

        }
        res.status(200).json({
            isSuccess: true,
            product
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- Invalid _id`
        })
    }


})
//create new product

const addNewProduct = catchAsyncErrors(async (req, res, next) => {
    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            isSuccess: true,
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- message:${err._message} -- Invalid property`
        })
    }
})

// update product
const updateProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        let product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                isSuccess: false,
                message: "Product has not found..."
            })
        }
        product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            isSuccess: true,
            product
        })
    } catch (err) {
        console.log(err);
    }
})

//delete product 
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler('Product has not found...', 404))
        }
        await Product.deleteOne();
        res.status(200).json({
            isSuccess: true,
            message: "Product has been deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- Invalid _id property`
        })
    }
})

module.exports = {
    getProducts,
    addNewProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}