const User = require("../Model/UserModel");

//data display 
const getAllUsers=async(req,res,next)=>{

    let users;
    //Get all Users
    try{
        users=await User.find();
    }catch(err){
        console.log(err)
    }
    //not found
    if(!users){
        return res.status(404).json({message:"user not found"});
    }
    //Dispaly all users
    return res.status(200).json({users});
};

//data insert
const addusers= async(req,res,next)=>{
    const{userid,name,email,age,address,userrole,password}=req.body;

    let users;

    try{
        users=new User({userid,name,email,age,address,userrole,password});
        await users.save();
    }catch(err){
        console.log(err);
    }
    //not insert users
    if(!users){
        return res.status(404).json({message:"unable to add users"});
    }return res.status(200).json({users});
};

//get by Id 
const getById=async(req,res,next)=>{
    const id=req.params.id;

    let users;

    try{
        users= await User.findById(id);
    }catch(err){
        console.log(err);
    }
     //not available users
     if(!users){
        return res.status(404).json({message:"unable to find users"});
    }return res.status(200).json({users});

}

//update user details
const Updateuser=async(req,res,next)=>{
    const id=req.params.id;
    const{userid,name,email,age,address,userrole,password}=req.body;

    let users;
    
    try{
        users=await User.findByIdAndUpdate(id,
            {userid:userid,name:name,email:email,age:age,address:address,userrole:userrole,password:password});
        users=await users.save();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"unable to update users"});
    }return res.status(200).json({users});
};

//delete User details
const DeleteUser=async(req,res,next)=>{
     const id=req.params.id

     let users;

     try{
        users=await User.findByIdAndDelete(id);
     }catch(err){
        console.log(err);
     } 
     if(!users){
        return res.status(404).json({message:"unable to delete users"});
    }return res.status(200).json({users});
}


exports.getAllUsers=getAllUsers;
exports.addusers=addusers;
exports.getById=getById;
exports.Updateuser=Updateuser;
exports.DeleteUser=DeleteUser;