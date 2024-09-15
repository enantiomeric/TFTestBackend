const express = require('express')
const router = express.Router()
const CronController = require('../controllers/CronController')

router.get('/ping', async(req, res)=>{
    CronController.ping(req, res)
})


module.exports = router