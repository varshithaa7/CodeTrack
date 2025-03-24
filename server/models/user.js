const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    platforms: {
        codeforces: { type: String, default: "" },
        github: { type: String, default: "" },
        leetcode: { type: String, default: "" },
        geeksforgeeks: { type: String, default: "" },
        hackerrank: { type: String, default: "" }
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports=UserModel