const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const jobController = require('../controllers/jobController')

const router = new express.Router()

//post job
router.post('/post',jwtMiddleware,jobController.postJob)
//get latest jobs
router.get('/getlatest',jobController.getLatestJobs)
//get all jobs
router.get('/get',jwtMiddleware,jobController.getAllJobs)
//get jobs by id
router.get('/get/:id',jwtMiddleware,jobController.getJobById)
//get adminjobs
router.get('/getadminjobs',jwtMiddleware,jobController.getAdminJobs)

module.exports = router