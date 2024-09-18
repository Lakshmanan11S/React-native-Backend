


// Register

// exports.register =async(req,res)=>{
//     try{
//         const{email,password}=req.body
//        const userEmail = await userRegister.findOne({email})
//        if(userEmail){
//         return res.status(400).json({message:"Email Already Exists"})
//        }
//        const saltRounds = 10;
//        const hashedPassword = await bcrypt.hash(password,saltRounds)
//        const newUser = new userRegister({
//         email,
//         password:hashedPassword
//        })

//        await newUser.save()
//        res.status(200).json({message:"User Registerd Successfully",data:newUser})

//     }catch(error){
//        res.status(500).json({message:"Internal Server Error"})
//     }
// }

//Get All Register

// exports.getAllRegister = async(req,res)=>{
//     try{
//         const registerDetails = await userRegister.find()
//         if(!registerDetails){
//            return  res.status(404).json({message:"User Register Not Found"})
//         }
//         res.status(200).json({message:"All Registerd Details",data:registerDetails})

//     }catch(error){
//         res.status(500).json({message:"Internal Server Error"})

//     }
// }




//Amazon

const User = require('../Model/userModel')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const sendVerificationEmail=async(email,verificationToken)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })
    const mailOption = {
        from:process.env.EMAIL,
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify your email: https://react-native-backend-1y0m.onrender.com/api/register/verify/${verificationToken} `,
    }

    try{

        await transporter.sendMail(mailOption) 
        console.log('Verification email send Successfully')

    }catch(error){
        console.error("Error sending verification email:", error);
    }
}

exports.register = async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log("Email already registered:", email); 
          return res.status(400).json({ message: "Email already registered" });
        }
      

        const newUser = new User({name,email,password})

         newUser.verificationToken =crypto.randomBytes(20).toString('hex')
         
         await newUser.save()

         sendVerificationEmail(newUser.email,newUser.verificationToken)
         res.status(200).json({message:"Register Successfully...Please Verifiy Your Email"})

    }catch(error){
         res.status(500).json({message:"Register Error Found"})
    }
}


exports.verifyToken = async(req,res)=>{
    try{
        const token = req.params.token;
        const user = await User.findOne({verificationToken:token});
        if(!user){
          return res.status(404).json({message:"Invalid verfication token"})
        }

        user.verified = true
        user.verificationToken = undefined;

        await user.save()
        res.status(200).json({message:"Email Verified Successfully"})

    }catch(error){
        res.status(500).json({message:"Email Verified Failed"})
    }
}