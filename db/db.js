const mongoose = require('mongoose')

// mongoose.connect(URI)
//     .then(()=>{console.log("DB Connected")})
//     .catch((err)=>{console.log("DB Connection error")})
const db = async () =>{
    const URI = process.env.DB_URI
    const createConnection = async ()=>{
        try{
            await mongoose.connect(URI)
            console.log("DB Connected")
        }catch( e ){
            console.log("DB Connection Error")
            console.log(e)
            return null
        }
        
    }
    createConnection()
    return mongoose.connection
}
    module.exports = db