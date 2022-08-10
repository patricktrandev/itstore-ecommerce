
const User = require('../models/user')

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        res.status(401).json({
            isSuccess: false,
            error: "Login first to access this resource."
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    isSuccess: false,
                    error: `Role (${req.user.role}) is not allowed to acccess this resource`
                }))

        }
        next()
    }
}


module.exports = {
    isAuthenticatedUser,
    authorizeRoles
}