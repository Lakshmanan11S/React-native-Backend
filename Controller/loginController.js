const registerModel = require('../Model/registerModel');
const bcrypt = require('bcrypt');

exports.login = async(req,res)=>{
    try{
        const {email,password}=req.body
        const registerEmail = await registerModel.findOne({email})
        if(!registerEmail){
            return res.status(404).json({message:"Email Not Found"})
        }
        const matchPassword = await bcrypt.compare(password,registerEmail.password)
        if(!matchPassword){
            return res.status(400).json({message:"Incorrect Password"})
        }
        res.status(200).json({message:"Login Successfully"})

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}