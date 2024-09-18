const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
require('dotenv').config()

const app = express()

const allRoutes = require('./Router/route')

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{console.log("Mongodb is Connected")})
.catch(()=>{console.log("Mongodb is not Connected")})

app.get('/',(req,res)=>{
    res.send("Chatapp")
})

app.use('/api',allRoutes)

app.listen(PORT,()=>{console.log("Server is running on:",PORT)})






