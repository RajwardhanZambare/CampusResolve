import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password:String,
    profilePhoto:String
})

const userModel = mongoose.model("user", userSchema)

export default userModel