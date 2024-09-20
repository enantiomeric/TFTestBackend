const logger = require('../config/logger')

const typesMiddleware = (req, res, next) => {

    const expectedTypes = {
        name: 'string',
        email: 'string',
        phone: 'string',
        college: 'string',
        year: 'number',
        events: 'object',
        amount: 'number',
        transactionLink: 'string',
        transactionID: 'string'
    };
    try{
        if (req.events && !Array.isArray(req.events)) {
            return res.status(400).json({ message: "Invalid type for events. Expected an array." });
        }
        for (const field in expectedTypes) {
            if (req.body[field] !== undefined && typeof req.body[field] !== expectedTypes[ field ]) {
                return res.status(400).json({ message: `Invalid type for ${field}. Expected ${expectedTypes[ field ]}.` });
            }
        }

    next(); 

    }catch( e ){
        console.log("Error" )
        console.log(e)
        logger.writeLog(e)
        res.status(500)
        res.send("Internal Server Error")
    }

};

module.exports = typesMiddleware;
