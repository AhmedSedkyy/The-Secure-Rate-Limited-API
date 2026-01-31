const express = require('express');
const taskController = require('../controllers/taskController.js')
const router = express.Router()
const auth = require('../middleware/authMiddleware.js')
const { createTaskValidation,updateTaskValidation,taskIdValidation } = require('../validators/taskValidator.js')

router.use(auth.authenticate);


router.route('/')
    .post(createTaskValidation,taskController.createTask)
    .get(taskController.getUserTasks);

router.route('/:id')
    .all(taskIdValidation)
    .get(taskController.getTask)
    .put(updateTaskValidation,taskController.updateTask)
    .delete(taskController.deleteTask);


module.exports = router;