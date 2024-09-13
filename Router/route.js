const express = require('express');
const api = express.Router()

const registerRoute = require('../Router/Routes/registerRoute')
const loginRoutes = require('../Router/Routes/loginRoute');


api.use('/register',registerRoute)
api.use('/login',loginRoutes)


module.exports=api