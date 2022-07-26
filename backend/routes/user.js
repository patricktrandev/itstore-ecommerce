const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { register, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/userController')
router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)

module.exports = router