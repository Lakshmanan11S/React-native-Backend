const userRegister = require('../Model/registerModel');
const bcrypt = require('bcrypt');


// Register

exports.register =async(req,res)=>{
    try{
        const{email,password}=req.body
       const userEmail = await userRegister.findOne({email})
       if(userEmail){
        return res.status(400).json({message:"Email Already Exists"})
       }
       const saltRounds = 10;
       const hashedPassword = await bcrypt.hash(password,saltRounds)
       const newUser = new userRegister({
        email,
        password:hashedPassword
       })

       await newUser.save()
       res.status(200).json({message:"User Registerd Successfully",data:newUser})

    }catch(error){
       res.status(500).json({message:"Internal Server Error"})
    }
}

//Get All Register

exports.getAllRegister = async(req,res)=>{
    try{
        const registerDetails = await userRegister.find()
        if(!registerDetails){
           return  res.status(404).json({message:"User Register Not Found"})
        }
        res.status(200).json({message:"All Registerd Details",data:registerDetails})

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})

    }
}