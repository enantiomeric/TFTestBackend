const express = require('express')
const app = express()
const https = require('https')

const cors = require('cors')
const db = require('./db/db')
const fs = require('fs')
const path = require('path')
const ParticipantRouter = require('./routes/ParticipantRouter')
const CronRouter = require('./routes/CronRouter')
const EventRouter = require('./routes/EventRouter')
const AdminRouter = require("./routes/AdminRouter")


const logger = require('./config/logger')
// const loggerMiddleware = require('./middleware/loggerMiddleware')

const dotenv = require('dotenv').config()

app.use(cors())
app.use(express.json({ strict: true,limit: '5mb' }));  
// app.use(loggerMiddleware)

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname,"certificates" ,'server.key')),
    cert: fs.readFileSync(path.join(__dirname,"certificates" ,'server.cert'))
  };
  


try{
    db()
}catch(e){
    logger.writeLog("DB Connection Error")
}


app.use("/participant", ParticipantRouter)
app.use("/cron", CronRouter)
app.use("/event", EventRouter)
app.use("/admin",AdminRouter)




// app.listen(443,()=>{
//     console.log("Server running at 443")
// })

https.createServer(sslOptions,app).listen(process.env.PORT, ()=>{
    console.log("Server is running")
})
