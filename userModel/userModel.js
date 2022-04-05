const mongoose = require('mongoose');
const emailValidator = require('email-validator')

const db_link = "mongodb+srv://admin:qs4MdZxej78Hh3Uy@cluster0.floao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then((db)=>{
    console.log("db connect");
}).catch((err)=>{
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword === this.password;
        }
    }
})

userSchema.pre('save',function(){
    this.confirmPassword = undefined;
})

//model

const userModel = mongoose.model('userModel' , userSchema , "User");


module.exports = userModel