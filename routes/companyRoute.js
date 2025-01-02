const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const companyController = require('../controllers/companyController')

const router = new express.Router()

// register - post
router.post('/register',jwtMiddleware,companyController.registerCompany)
//get company
router.get('/get',jwtMiddleware,companyController.getCompany)
//get companyById
router.get('/get/:id',jwtMiddleware,companyController.getCompanyById)
//update company
router.put('/update/:id',jwtMiddleware,companyController.updateCompany)

module.exports = router