const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name  : { type: String, required : true},
        email : { type: String, required : true},        
        phone : { type: String, required : true},
        college : { type: String, required : true},
        events : { type : [String], required : true},
        transactionLink : { type: String, required : true},
        transactionID : { type: String, required : true}
    
    }
)

const Participant = mongoose.model("Participant", schema);
module.exports = Participant