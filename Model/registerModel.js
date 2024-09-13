const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    },
})

const result = new mongoose.model('register',registerSchema)

module.exports=result;