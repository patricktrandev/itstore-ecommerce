const express = require('express');
const { route } = require('../app');
const router = express.Router();

const { register, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updateUserPassword, updateUserProfile, getAllUsers, getUserDetails, updateUser, deleteUserByAdmin } = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
router.route('/register').post(register)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers)
router.route('/admin/users/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
router.route('/admin/users/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
router.route('/admin/users/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUserByAdmin)


router.route('/user/me').get(isAuthenticatedUser, getUserProfile)
router.route('/user/me/password/update').put(isAuthenticatedUser, updateUserPassword)
router.route('/user/me/update').put(isAuthenticatedUser, updateUserProfile)

module.exports = router