const express = require('express');
const UserController = require('../controllers/userController.js')
const router = express.Router()
const auth = require('../middleware/authMiddleware.js')



router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/profile', auth.authenticate, UserController.profile);


module.exports = router;