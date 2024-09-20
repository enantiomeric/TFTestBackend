const express = require('express')
const app = express()

const cors = require('cors')
const db = require('./db/db')

const ParticipantRouter = require('./routes/ParticipantRouter')
const CronRouter = require('./routes/CronRouter')
const EventRouter = require('./routes/EventRouter')
const AdminRouter = require("./routes/AdminRouter")

const logger = require('./config/logger')
const loggerMiddleware = require('./middleware/loggerMiddleware')

const dotenv = require('dotenv').config()

app.use(cors())
app.use(express.json({ strict: true,limit: '5mb' }));  
app.use(loggerMiddleware)

try{
    db()
}catch(e){
    logger.writeLog("DB Connection Error")
}


app.use("/participant", ParticipantRouter)
app.use("/cron", CronRouter)
app.use("/event", EventRouter)
app.use("/admin",AdminRouter)




app.listen(3000,()=>{
    console.log("Server running at 3000")
})
