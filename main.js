const express = require('express')
const app = express()

const cors = require('cors')
const db = require('./db/db')

const ParticipantRouter = require('./routes/ParticipantRouter')
const CronRouter = require('./routes/CronRouter')


app.use(cors())
app.use(express.json())
db()

app.use("/participant", ParticipantRouter)
app.use("/cron", CronRouter)

app.listen(3000,()=>{
    console.log("Server running at 3000")
})
