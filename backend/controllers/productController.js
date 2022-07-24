const Product = require('../models/products');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const { defineKeySearch, filterKeyword, pagination } = require('../utils/searchUtils')
const getProducts = catchAsyncErrors(async (req, res, next) => {

    const perPage = 4;
    const productCount = await Product.countDocuments();
    const { keyword, page } = req.query;
    const { currentPage, skip } = pagination(req.query, perPage);

    try {
        //let name = defineKeySearch(keyword)
        let filterQueryStr = filterKeyword(req.query);

        let products = await Product.find({ ...filterQueryStr }).limit(perPage).skip(skip);
        //console.log("here", products)
        res.status(200).json({
            isSuccess: true,
            count: products.length,
            productCount: productCount,
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- ${err._message}`
        })
    }

})

//get single product
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                isSuccess: false,
                message: "Product has not found..."
            })
        } else {
            res.status(200).json({
                isSuccess: true,
                product
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- message:${err._message} -- Invalid property`
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
        res.status(500).json({
            isSuccess: false,
            message: err.message
        })
    }
})

//delete product 
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                isSuccess: false,
                message: 'Product has not found...'
            })
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