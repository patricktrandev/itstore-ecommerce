const User = require('../models/user');
const crypto = require('crypto')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require('cloudinary')
const { defineKeySearch, filterKeyword, pagination, defineEmailSearch } = require('../utils/searchUtils')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { handleDulplicate } = require('../middleware/handleErrors')
// register user
const register = catchAsyncErrors(async (req, res, next) => {

    try {
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            width: 150,
            crop: 'scale',
            public_id: `${Date.now()}`,
            resource_type: "auto",
        })
        console.log(req.body.avatar)
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
        sendToken(user, 200, res)


    } catch (err) {
        console.log(">>>", err);

        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })


    }


})
//get currently logged in user detail  api/v1/user/me
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})
//update currently logged in user => api/v1/user/me/password/update/
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password');

        // Check previous user password
        const isMatched = await user.comparePassword(req.body.oldPassword)
        if (!isMatched) {

            return next(res.status(400).json({
                isSuccess: false,
                error: 'Old password is incorrect'
            }));
        }

        user.password = req.body.password;
        await user.save();

        sendToken(user, 200, res)
    } catch (err) {
        console.log(err);

        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }

})
//update user profile api/v1/user/me/update

const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        //Update avatar
        if (req.body.avatar !== '') {
            const user = await User.findById(req.user.id)

            const image_id = user.avatar.public_id;
            const res = await cloudinary.v2.uploader.destroy(image_id);

            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'avatar',
                width: 150,
                crop: "scale"
            })

            newUserData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }

})
// get all users => /api/v1/admin/users

const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;
    const perPage = 3;
    const userCount = await User.countDocuments();
    const emailKeySearch = defineEmailSearch(email);
    const { currentPage, skip } = pagination(req.query, perPage);
    try {
        const users = await User.find({ ...emailKeySearch }).limit(perPage).skip(skip);
        res.status(200).json({
            success: true,
            userCount: userCount,
            users
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }
})

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {

        return next(res.status(400).json({
            isSuccess: false,
            error: `User does not found with id: ${req.params.id}`
        }))
    }

    res.status(200).json({
        success: true,
        user
    })
})
//update user (admin)  api/v1/admin/users/:id
const updateUser = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }
})
//deleteUser
const deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(res.status(400).json({
                isSuccess: false,
                error: `User does not found with id: ${req.params.id}`
            }))
        }

        // Remove avatar from cloudinary
        // const image_id = user.avatar.public_id;
        // await cloudinary.v2.uploader.destroy(image_id);

        await user.remove();

        res.status(200).json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }

})



const loginUser = catchAsyncErrors(async (req, res, next) => {


    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password')
        const isPasswordMatched = await user.comparePassword(password);
        if (!email || !password) {
            return next(res.status(400).json({
                isSuccess: false,
                error: "Please enter email and password"
            }))
        }
        //find user in db
        // Finding user in database


        if (!user) {
            return next(res.status(401).json({
                isSuccess: false,
                error: "Invalid Email or Password"
            }))
        }

        // Checks if password is correct or not


        if (!isPasswordMatched) {
            return next(res.status(401).json({
                isSuccess: false,
                error: "Invalid Email or Password"
            }))

        }
        // const token = user.getJwtToken();
        // res.status(200).json({
        //     success: true,
        //     token: token,
        // })

        sendToken(user, 200, res)


    } catch (err) {
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        })
    }
})

//forgot password => /api/v1/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(res.status(401).json({
            isSuccess: false,
            error: "User not found with this email"
        }))

    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `
    <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
        .img-mail {
            width: 200px;
            height: 200px;
        }

        .mail__content {
            padding: 20px;
            border: 1px solid rgba(87, 83, 83, 0.533);
            box-shadow: 2px 5px 7px rgba(117, 114, 114, 0.533);
            text-align: center;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            width: 80%;
            margin: auto;
        }

        .mail__text {
            color: blue;
            font-size: 2rem;
            margin: 0 auto;
        }

        .mail__text__small {
            font-size: 15px;
            color: rgba(26, 22, 22, 0.533);
        }

        .reset__btn {
            padding: 15px 25px;
            border: none;
            background-color: rgb(54, 54, 238);
            border-radius: 7px;
            transition: all .5s;
        }

        .reset__btn:hover {
            border: none;
            background-color: slateblue;
            border-radius: 7px;
        }

        .reset__btn a {
            text-decoration: none;
            color: aliceblue;
        }
    </style>
</head>

<body>
    <div>

        <div class="mail__content">
            <img class="img-mail"
                src="https://cdn4.vectorstock.com/i/thumb-large/48/88/house-book-logo-icon-design-vector-22504888.jpg"
                alt="">
            <h2 class="mail__text">You have requested to reset your password</h2>
            <p class="mail__text__small">If you've lost your password or wish to reset it, use the link below to get
                started
            </p>
            <button class="reset__btn"><a href=${resetUrl}>Reset Your Password</a></button>
            <p class="mail__text__small">If you have not requested this email, then ignore it.</p>
        </div>
    </div>


</body>

</html>

    `


    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(res.status(500).json({
            isSuccess: false,
            message: err.message,
            code: err.code || 500
        }))
    }

})
//reset password - reset token /api/v1/password.reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(res.status(400).json({
            isSuccess: false,
            error: 'Password reset token is invalid or has been expired'
        }))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(res.status(400).json({
            isSuccess: false,
            error: 'Password does not match'
        }))

    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})
module.exports = {
    register,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateUserPassword,
    updateUserProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUserByAdmin
}