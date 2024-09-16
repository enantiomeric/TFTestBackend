const express = require('express')

const router = express.Router()

const participantController = require('../controllers/ParticipantController')

const verifyMiddleware = require('../middleware/verifyMiddleware')
const typesMiddleware = require('../middleware/typesMiddleware')

router.post('/register', verifyMiddleware, typesMiddleware ,async(req, res)=>{
    participantController.register(req, res)
})

module.exports = router