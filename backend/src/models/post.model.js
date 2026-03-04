import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    image:String,
    title:String,
    caption:String,
    upvotes:Number,
    comments:Number,
    username:String,
    profilePhoto:String,
    location:{
        type:String,
        default: "cse"
    },
    resolved: {
        type: Boolean,
        default: false
    }
})
const postModel = mongoose.model("post", postSchema) //'post' will be the name of the collection in the database

export default postModel