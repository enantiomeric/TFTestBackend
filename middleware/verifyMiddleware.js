const validator = require('email-validator')

const verifyRegistration = (req, res, next) => {

    function validatePhoneNumber(phoneNumber) {
        const onlyNumbers = /^[0-9]+$/;
        const countryCode91 = /^91[0-9]{10}$/;
        const plus91 = /^\+91[0-9]{10}$/;
    
        if (phoneNumber.length === 10 && onlyNumbers.test(phoneNumber)) {
            return true
        } else if (phoneNumber.length === 12 && countryCode91.test(phoneNumber)) {
            return true
        } else if (phoneNumber.length === 13 && plus91.test(phoneNumber)) {
            return true
        }
        return false
    }

    function validateEvents(events) {
        const validEvents = ["CodeCrush", "CodeDuet", "CloudVerse", "Bid2Build"];
        if (events.length > 4) {
            return false;
        }
        const uniqueEvents = new Set(events);
        if (uniqueEvents.size !== events.length) {
            return false;
        }
        for (let event of events) {
            if (!validEvents.includes(event)) {
                return false;
            }
        }
        return true;
    }
    try{
        const missing = []
        if(!(req.body.name)){ missing.push("name")}
        if(!(req.body.email)){ missing.push("email")}
        if(!(req.body.phone)){ missing.push("phone")}
        if(!(req.body.college)){ missing.push("college")}
        if(!(req.body.events)){ missing.push("events")}
        if(!(req.body.transactionLink)){ missing.push("transactionLink")}
        if(!(req.body.transactionID)){ missing.push("transactionID")}
    
        if ( missing.length > 0 ){
            res.status(400)
            res.json(({"message" : "Incomplete request", "missing" : missing}))
            res.send()
        }else if (!validator.validate(req.body.email)){
            res.status(400)
            res.json(({"message" : "Incorrect Email",}))
            res.send()
        }else if (!validatePhoneNumber(req.body.phone)){
            res.status(400)
            res.json(({"message" : "Incorrect Phone Number",}))
            res.send()
        }else if( !validateEvents(req.body.events)){
            res.status(400)
            res.json(({ "message" : "Incorrect Events Array. Check below array of Valid Events. Length shouldn't exceed 4 with no duplicates ", 
                        "events" : ["CodeCrush", "CodeDuet", "CloudVerse", "Bid2Build"]
             }))
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