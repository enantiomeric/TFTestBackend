const verifier = require('../middleware/verifyMiddleware')
const Participant = require('../models/Participant')
const Event = require('../models/Event')


exports.register = async (req ,res) => {

    try{

        const { name, email, phone, college, events, transactionLink, transactionID } = req.body
        
        const newParticipant = new Participant({
            name : name,
            email : email,
            phone : phone,
            college : college,
            events : events,
            transactionLink : transactionLink,
            transactionID : transactionID
        }) 
        
        await Promise.all(
            events.map(async (event) => {
              await Event.findOneAndUpdate({ name: event }, { $inc: { currentCount: 1 } }, { new: true });
            })
          );

        newParticipant.save()

        console.log("Registration Successful")
        res.status(200)
        res.json( {"message" : "Registration Successful"})
        
    }catch ( error ){
        console.log("An Error Occured : Register")
        console.log ( error )
        res.status(500)
        res.json({ "message" : "Internal Server Error"})
    }

}