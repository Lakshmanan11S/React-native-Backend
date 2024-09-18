const crypto  = require("crypto")
const User = require("../Model/userModel")
const JWT = require('jsonwebtoken')


const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
  
    return secretKey;
  };
  
  const secretKey = generateSecretKey();

exports.login = async(req,res)=>{
    try{
        const {email,password}=req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid Email or Password"})
        }
        if(user.password !==password){
            return res.status(401).json({message:"Invalid Password"})
        }
        const token = JWT.sign({userId:user._id},secretKey)

        res.status(200).json({ token });

    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}