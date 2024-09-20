const Event = require('../models/Event')
const logger = require('../config/logger')


exports.meta = async (req, res)=>{

    try{

        const name = req.body.name
        const event = await Event.findOne({name : name})
        if(!event){
            res.json(
                {
                    "message" : "No such event"
                }
            )
            res.status(400)
            res.send()
        }
        res.json({
            name : event.name,
            startTime : event.startTime,
            endTime : event.endTime,
            full : event.full,
        })
        

    }catch( error ){
        console.log("An Error Occured : EventController")
        console.log(error)
        logger.writeLog(error)
    }


}