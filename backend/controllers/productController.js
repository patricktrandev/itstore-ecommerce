const Product = require('../models/products');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary')
const { defineKeySearch, filterKeyword, pagination } = require('../utils/searchUtils')
const getProducts = catchAsyncErrors(async (req, res, next) => {

    const perPage = 8;
    //const productCount = await Product.countDocuments();
    const { keyword, page } = req.query;
    const { currentPage, skip } = pagination(req.query, perPage);

    try {
        let name = defineKeySearch(keyword)
        let filterQueryStr = filterKeyword(req.query);

        let products = await Product.find({ ...filterQueryStr }).limit(perPage).skip(skip);
        const productCount = await Product.find({ ...filterQueryStr }).countDocuments();
        //console.log("here", products)
        setTimeout(() => {
            res.status(200).json({
                isSuccess: true,
                productCount: productCount,
                perPage: perPage,
                products
            })
        }, 3000)


    } catch (err) {
        console.log(err)
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- ${err._message}`
        })
    }

})

// /api/v1/admin/products
const getProductsAdmin = catchAsyncErrors(async (req, res, next) => {

    try {

        let products = await Product.find()
        res.status(200).json({
            isSuccess: true,
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
        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
        req.body.user = req.user.id;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: `${err.message} -- message:${err._message} -- Invalid property`
        })
    }
})

// update product
const updateProduct = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params;
        let product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product has not found..."
            })
        }

        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        if (images !== undefined) {

            // Deleting images associated with the product
            for (let i = 0; i < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            }

            let imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'products'
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }

            req.body.images = imagesLinks

        }

        product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//delete product 
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        console.log("product delete", product)
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product has not found...'
            })
        }
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({
            success: true,
            message: "Product has been deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: `${err.message} -- Invalid _id property`
        })
    }
})
const createProductReview = catchAsyncErrors(async (req, res, next) => {
    try {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }
        //find product 
        const product = await Product.findById(productId);
        const isReviewed = product.reviews.find(
            rev => rev.user.toString() === req.user._id.toString()
        );
        if (isReviewed) {
            //if review existed -> update review
            product.reviews.forEach(review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating;
                }
            })
        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        product.ratings = product.reviews.reduce((val, item) => item.rating + val, 0) / product.reviews.length

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- Invalid _id property`
        })
    }
})
///api/v1/reviews
const getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.id)
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: `${err.message} -- Invalid _id property`
        })
    }
})

const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.query.productId
        const product = await Product.findById(productId);
        //console.log(">>> find product", product)
        //id review
        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

        const numOfReviews = reviews.length;

        const ratings = product.reviews.reduce((val, item) => item.rating + val, 0) / reviews.length

        await Product.findByIdAndUpdate(productId, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            reviews: product.reviews
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
    deleteProduct,
    createProductReview,
    getAllProductReviews,
    deleteProductReview,
    getProductsAdmin
}