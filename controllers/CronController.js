exports.ping = async (req, res) =>{
    try{
        res.status(200)
        res.json({"message" : "pong"})
    }catch( error ){
        console.log("An Error Occured : CronController")
        console.log( error )
        res.status(500)
        res.json({ "message" : "Internal Server Error"})
        res.send()
    }
}