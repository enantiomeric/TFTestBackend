const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name  : { type: String, required : true},
        email : { type: String, required : true},        
        post : { type: String, required : true},
        readPermission : { type: Boolean, required : true},
        writePermission : { type: Boolean, required : true}
    }
)

const Participant = mongoose.model("Participant", schema);
module.exports = Participant