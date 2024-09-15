const express = require('express')
const app = express()

const cors = require('cors')
const db = require('./db/db')

const ParticipantRouter = require('./routes/ParticipantRouter')
const CronRouter = require('./routes/CronRouter')
const EventRouter = require('./routes/EventRouter')


const dotenv = require('dotenv').config()

app.use(cors())
app.use(express.json({ strict: true }));
db()


app.use("/participant", ParticipantRouter)
app.use("/cron", CronRouter)
app.use("/event", EventRouter)




app.listen(3000,()=>{
    console.log("Server running at 3000")
})
