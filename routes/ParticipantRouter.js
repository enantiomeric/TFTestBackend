const express = require('express')

const router = express.Router()

const participantController = require('../controllers/ParticipantController')

const verifyMiddleware = require('../middleware/verifyMiddleware')

router.post('/register', verifyMiddleware ,async(req, res)=>{
    participantController.register(req, res)
})

module.exports = router