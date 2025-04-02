const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({

    userid:{
        type:String,//datatype
        required:true//validate
    },
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
    },
    userrole:{
        type: String,
        required: true,
        enum: ["admin", "projectManager", "client", "supplier","quantitysurveyor","sitesupervisor","inventorymanager","financeofficer"], // Restrict to these roles
        default: "client", // Default role if none specified
    },
    password:{
        type:String,//datatype
        required:true//validate
    },
});

module.exports=mongoose.model(
    "UserModel",//file name
    UserSchema //function name

)