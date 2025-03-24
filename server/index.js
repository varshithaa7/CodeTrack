const express=require("express")
const mongoose = require("mongoose")
const cors=require("cors")
const UserModel= require('./models/user')
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://madhumeeta27:522-sLbcVr655t3@user.aoq7r.mongodb.net/user?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Error connecting to MongoDB:", err));



app.post("/login", (req,res) => {
    const {email,password} =req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password==password)
                res.json("Success")
            else{
                res.json("The password is incorrect")
            }
        } else{
            res.json("No such record exists")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, ()=>{
    console.log("server is running")
})