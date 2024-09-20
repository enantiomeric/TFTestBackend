const express = require('express')
const adminController = require('../controllers/AdminController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/signup', async(req, res)=>{
    adminController.signUp(req, res)
})

router.post('/login', async(req, res) =>{
    adminController.logIn(req, res)
})

router.post('/attendance',authMiddleware ,async(req, res)=>{
    adminController.addAttendance(req, res)
})

router.delete('/attendance',authMiddleware ,async(req, res)=>{
    adminController.deleteAttendance(req, res)
})

router.post('/getattendance',authMiddleware, async(req, res)=>{
    adminController.getAttendance(req, res)
})

router.post('/getParticipants',authMiddleware,async(req, res)=>{
    adminController.getParticipants(req,res)
})


module.exports = router