const mongoose = require('mongoose')
const URI = process.env.DB_URI


// mongoose.connect(URI)
//     .then(()=>{console.log("DB Connected")})
//     .catch((err)=>{console.log("DB Connection error")})
const db = async () =>{
    let con 
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