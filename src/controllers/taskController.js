const taskService = require('../services/taskService');
const asyncHandler = require('../utils/asyncHandler')




/**
 * @desc    Create a new task 
 * @route   POST /api/task
 * @access  Private
 */

const createTask = asyncHandler(async (req, res) => {

    const context = { data: req.body, ip: req.ip, userId: req.user.id }

    const result = await taskService.createTask(context);

    res.status(201).json({ success: true, data: result });
})


/**
 * @desc    Get all tasks belonging to user
 * @route   GET /api/task
 * @access  Private
 */


const getUserTasks = asyncHandler(async (req, res) => {

    const result = await taskService.getUserTasks(req.user.id);

    res.status(200).json({ success: true, data: result });
})


/**
 * @desc    Update a task by ID
 * @route   PUT /api/task/:id
 * @access  Private
 */


const updateTask = asyncHandler(async (req, res) => {

    const context = { data: req.body, ip: req.ip, userId: req.user.id, taskId: req.params.id }

    const result = await taskService.updateTask(context);

    res.status(200).json({ success: true, data: result });
})


/**
 * @desc    Delete a task by ID
 * @route   DELETE /api/task/:id
 * @access  Private
 */

const deleteTask = asyncHandler(async (req, res) => {

    const context = { ip: req.ip, userId: req.user.id, taskId: req.params.id }

    const result = await taskService.deleteTask(context);

    res.status(200).json({ success: true, data: result });
})




module.exports = { createTask, getUserTasks, updateTask, deleteTask }
