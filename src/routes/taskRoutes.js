const express = require('express');
const taskController = require('../controllers/taskController.js')
const router = express.Router()
const auth = require('../middleware/authMiddleware.js')

router.use(auth.authenticate);


router.route('/')
    .post(taskController.createTask)
    .get(taskController.getUserTasks);

router.route('/:id')
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);





module.exports = router;