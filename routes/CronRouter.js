const express = require('express')
const router = express.Router()
const CronController = require('../controllers/CronController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/ping', async(req, res)=>{
    CronController.ping(req, res)
})
router.get('/logs', authMiddleware, async(req, res)=>{
    CronController.logs(req, res)
})

module.exports = router