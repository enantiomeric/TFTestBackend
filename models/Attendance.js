const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        present : { type : Boolean, required : true},
        event : { type : mongoose.Schema.Types.ObjectId , ref : "Event" , required : true},
        participant : { type : mongoose.Schema.Types.ObjectId , ref : "Participant" , required : true },
        markingAdmin : { type : mongoose.Schema.Types.ObjectId , ref : "Admin", required : true },
        time : { type : Date, required : false}

    }
)

const Attendance = mongoose.model("Attendance", schema);
module.exports = Attendance