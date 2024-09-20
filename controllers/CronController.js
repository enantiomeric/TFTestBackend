const Admin = require('../models/Admin')
const logger = require('../config/logger')
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

exports.logs = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const admin = await Admin.findById(adminId);

        if (!admin.readPermission || !admin.writePermission) {
            return res.status(403).json({ message: "You do not have permission to view logs" });
        }
        res.json({
            "logs" : logger.readLog()
        })

    } catch (error) {
        console.log("An Error Occured")
        logger.writeLog(error)
        console.log(error)
        res.status(500).json({ message: "Failed to fetch logs" });
    }
};
