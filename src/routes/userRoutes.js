const express = require('express');
const UserController = require('../controllers/userController.js')
const router = express.Router()
const auth = require('../middleware/authMiddleware.js')
const {registerValidation,loginValidation  } = require('../validators/userValidator.js');



router.post('/register', registerValidation, UserController.register);

router.post('/login', loginValidation, UserController.login);

router.get('/profile', auth.authenticate, UserController.profile);


module.exports = router;