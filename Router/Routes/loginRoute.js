const express = require('express');
const loginController = require('../../Controller/loginController');
const router = express.Router();

router.post('/userLogin',loginController.login)




module.exports = router;