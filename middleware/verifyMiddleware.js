const validateEmail = require('./validators/validateEmail')
const validatePhone = require('./validators/validatePhone')
const validateEvents = require('./validators/validateEvents')
const validateEverything = require('./validators/validateEverything')

const verifyRegistration = (req, res, next) => {

    try{
    
        if ( ! (validateEverything(req) [0]) ){
            res.status(400)
            res.json(({"message" : "Incomplete request", "missing" : missing}))
            res.send()
        }else if (!validateEmail(req.body.email)){
            res.status(400)
            res.json(({"message" : "Incorrect Email",}))
            res.send()
        }else if (!validatePhone(req.body.phone)){
            res.status(400)
            res.json(({"message" : "Incorrect Phone Number",}))
            res.send()
        }else if( !validateEvents(req.body.events)){
            res.status(400)
            res.json({ 
                "message" : "Incorrect Events Array. Check below array of Valid Events. Length shouldn't exceed 4 with no duplicates ", 
                "events" : ["CodeCrush", "CodeDuet", "CloudVerse", "Bid2Build"]
             })
            res.send()
        }
        else{
            next()
        }
        


    }catch(error){
        console.log("An Error Occured : verifyMiddleware")
        console.log(req)
        console.log(error)
        res.status(500)
        res.json({"message" : "Internal Server Error"})
        res.send()
    }



}

module.exports = verifyRegistration