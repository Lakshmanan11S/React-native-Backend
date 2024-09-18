const express = require('express');
const registerController = require('../../Controller/registerController');
const router = express.Router();

// router.post('/userRegister',registerController.register)
// router.get('/getAllRegister',registerController.getAllRegister)
router.post('/userRegister',registerController.register)
router.get('/verify/:token',registerController.verifyToken)



module.exports = router;