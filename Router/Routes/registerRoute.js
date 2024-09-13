const express = require('express');
const registerController = require('../../Controller/registerController');
const router = express.Router();

router.post('/userRegister',registerController.register)
router.get('/getAllRegister',registerController.getAllRegister)



module.exports = router;