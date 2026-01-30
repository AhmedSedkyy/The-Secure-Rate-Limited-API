const express = require('express');
const logController = require('../controllers/logController.js')
const router = express.Router()
const auth = require('../middleware/authMiddleware.js')


router.use(auth.authenticate, auth.adminOnly);


router.get('/', logController.getAllLogs)




module.exports = router;