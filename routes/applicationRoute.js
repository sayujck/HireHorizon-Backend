const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const applicationController = require('../controllers/applicationController')

const router = new express.Router()

// apply job - post
router.get('/apply/:id',jwtMiddleware,applicationController.applyJob)
//get applied jobs
router.get('/get',jwtMiddleware,applicationController.getAppliedJobs)
//get applicants
router.get('/:id/applicants',jwtMiddleware,applicationController.getApplicants)
//update status 
router.post('/status/:id/update',jwtMiddleware,applicationController.updateStatus)

module.exports = router