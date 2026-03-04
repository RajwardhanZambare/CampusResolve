import mongoose from 'mongoose'

async function connectDB(){
    await mongoose.connect(process.env.DATABASE_URI)
    console.log("connected to DataBase")
}

export default connectDB