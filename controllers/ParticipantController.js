const Participant = require('../models/Participant')
const Event = require('../models/Event')
const {v4 : UUID } = require('uuid')
const logger = require('../config/logger')


exports.register = async (req ,res) => {

    try{

        const { name, email, phone, college, year, events, amount, transactionLink ,transactionID } = req.body

        
        const newParticipant = new Participant({
            name : name,
            email : email,
            phone : phone,
            college : college,
            year : year,
            events : events,
            amount : amount,
            transactionLink : transactionLink,
            transactionID : transactionID,
            verified : false,
            PID : -1,
            UUID : UUID()
        }) 
        try{

            await Promise.all(
                events.map(async (event) => {
                    await Event.findOneAndUpdate({ name: event }, { $inc: { currentCount: 1 } }, { new: true });
                })
            );
        }catch( e ){
            logger.writeLog(e)
            console.log("An error occured")
        }            
            
        await newParticipant.save()

        console.log("Registration Successful")
        logger.writeLog("Registration Successful")
        res.status(200)
        res.json( {"message" : "Registration Successful"})
        
    }catch ( error ){
        console.log("An Error Occured : Register")
        console.log ( error )
        logger.writeLog(error)
        res.status(500)
        res.json({ "message" : "Internal Server Error"})
    }

}