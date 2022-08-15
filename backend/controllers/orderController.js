const Order = require('../models/order')
const Product = require('../models/products')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const { defineKeySearch, filterKeyword, pagination } = require('../utils/searchUtils')

//api/v1/orders/new
const createOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { orderItems, shippingInfo, itemsPrice, taxPrice, shipingPrice, totalPrice, paymentInfo } = req.body

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shipingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        });
        // console.log(order)
        res.status(200).json({
            isSuccess: true,
            order
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
//api/v1/orders/me
const getMyOrder = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params;
        const orders = await Order.find({ user: req.user.id });
        if (!orders) {
            return res.status(404).json({
                isSuccess: false,
                message: `No order has been found with userId ${req.user.id}`
            })
        } else {
            res.status(200).json({
                isSuccess: true,
                orders
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            isSuccess: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }
})

//get single order by id 
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if (!order) {
            return next(res.status(404).json({
                isSuccess: false,
                message: 'No Order found with this ID'
            }))

        }

        res.status(200).json({
            success: true,
            order
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


// api/v1/admin/orders
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    try {

        //const orderCount = await Order.countDocuments();

        const orders = await Order.find();

        let totalAmount = orders.reduce((val, ele) => {
            return val += ele.totalPrice;
        }, 0)
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Orders has not found..."
            })
        } else {
            res.status(200).json({
                success: true,
                totalAmount: totalAmount,
                orders
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }
})
//update / process orders => api/v1/admin/orders/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (order.orderStatus === 'Delivered') {
            return next(res.status(400).json({
                success: false,
                message: `You have already delivered this order`
            }))
        }

        order.orderItems.forEach(async item => {
            // console.log(">>>", item.product._id, item.quantity)
            await updateStock(item.product, item.quantity)
        })

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now()

        await order.save()

        res.status(200).json({
            success: true,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }
})

async function updateStock(id, quantity) {

    const product = await Product.findById(id);
    console.log("product", product)
    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return next(res.status(404).json({
                success: false,
                message: 'No Order found with this ID'
            }))

        }

        await order.remove()

        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: `${err.message} -- ${err._message}`,
            code: err.code || 500
        })
    }

})

module.exports = {
    createOrder,
    getMyOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getSingleOrder
}