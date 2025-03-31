const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,//datatype
        required:true//validate
    },
    email:{
        type:String,//datatype
        required:true//validate
    },
    age:{
        type:Number,//datatype
        required:true//validate
    },
    address:{
        type:String,//datatype
        required:true//validate
    }
});

module.exports=mongoose.model(
    "UserModel",//file name
    UserSchema //function name

)