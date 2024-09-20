const logger = require('../config/logger')

const loggerMiddleware = (req, res, next) => {
    try {
        logger.writeLog('----------------------------------------------')
        logger.writeLog('Request Headers:', req.headers)
        logger.writeLog('Request Body:', req.body)
    } catch (err) {
        console.error('Error logging request details:', err)
    }
    next()
};

module.exports = loggerMiddleware
