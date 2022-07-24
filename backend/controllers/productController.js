const Product = require('../models/products')

const getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        isSuccess: true,
        count: products.length,
        products
    })
}

//get single product
const getSingleProduct = async (req, res, next) => {

    const { id } = req.params;
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                isSuccess: false,
                message: "Product has not found..."
            })
        }
        res.status(200).json({
            isSuccess: true,
            product
        })
    } catch (err) {
        console.log(err);
    }


}
//create new product

const addNewProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        isSuccess: true,
        product
    })
}

// update product
const updateProduct = async (req, res, next) => {
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
}

//delete product 
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
        res.status(404).json({
            isSuccess: false,
            message: "Product has not found..."
        })
    }
    await Product.deleteOne();
    res.status(200).json({
        isSuccess: true,
        message: "Product has been deleted"
    })
}

module.exports = {
    getProducts,
    addNewProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}