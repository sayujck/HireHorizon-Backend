const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()

// register - post
router.post('/register',userController.registerController)
// login - post
router.post('/login',userController.loginController)
// profile update
router.put('/profile/update',jwtMiddleware,multerMiddleware.single("profilePic"),userController.updateProfileController)

module.exports = router