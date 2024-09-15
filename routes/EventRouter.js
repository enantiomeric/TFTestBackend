const express = require('express')
const router = express.Router()

const EventController = require('../controllers/EventController')


router.post('/meta', async(req, res)=>{
    EventController.meta(req,res)
})


module.exports = router