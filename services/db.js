const mongoose =require("mongoose") //import mongoose

//connection string
mongoose.connect('mongodb://localhost:27017/BankApp',{
useNewUrlParser:true,
useUnifiedTopology:true

})

//model
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number
})

//export
module.exports={
User
}