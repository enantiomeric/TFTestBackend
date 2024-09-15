function validateEverything( req ){

    const missing = []
    if(!(req.body.name)){ missing.push("name")}
    if(!(req.body.email)){ missing.push("email")}
    if(!(req.body.phone)){ missing.push("phone")}
    if(!(req.body.college)){ missing.push("college")}
    if(!(req.body.events)){ missing.push("events")}
    if(!(req.body.transactionLink)){ missing.push("transactionLink")}
    if(!(req.body.transactionID)){ missing.push("transactionID")}

    if (missing.length === 0 ){
        return [ true, missing ]
    }else{
        return [ false, missing ]
    }
}

module.exports = validateEverything