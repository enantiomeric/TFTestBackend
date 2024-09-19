const mongoose = require('mongoose')



const schema = new mongoose.Schema(
    {
        name  : { type: String, required : true},
        email : { type: String, required : true},        
        phone : { type: String, required : true},
        college : { type: String, required : true},
        year : { type : Number, required : true},
        events : { type : [String], required : true},
        amount : { type : Number, required : true },
        transactionLink : { type: String, required : true},
        transactionID : { type: String, required : true},
        verified : { type : Boolean, required : true},
        PID : { type : Number, required : false},
        UUID : { type : String, required : false}
    }
)

const Participant = mongoose.model("Participant", schema);
module.exports = Participant