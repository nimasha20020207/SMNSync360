const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PasswordSchema=new Schema({

    passwordid:{
        type:String,//datatype
        required:true//validate
    },
    
    email:{
        type:String,//datatype
        required:true//validate
    },
    
    userid:{
        type:String,//datatype
        required:true//validate
    },
    phoneNumber:{
        type:Number,//datatype
        required:true//validate
    },
    question1:{
        type:String,//datatype
    },
    question2:{
        type:String,//datatype
    },

    reason:{
        type:String,//datatype
        required:true//validate
    },
    
    
    
});

module.exports=mongoose.model(
    "PasswordModel",//file name
    PasswordSchema //function name

)