const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name  : { type: String, required : true},
        startTime : { type: Number, required : true},
        endTime : { type: Number, required : true},
        currentCount : { type: Number, required : true},
        full : { type : Boolean, required : true}        
    }
)

const Event = mongoose.model("Event", schema);
module.exports = Event