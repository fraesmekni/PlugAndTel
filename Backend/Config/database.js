const mongoose = require ('mongoose')
const env = require('dotenv').config()
// Connect to MongoDB using Mongoose.
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.mongoUrl) 
        console.log(`mongodb connected`)
    } catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB