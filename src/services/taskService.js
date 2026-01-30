const prisma = require('../config/database');
const logsService = require('./logsService');
const appError = require("../utils/appError");





const getOwnedTask = async (taskId, userId) => {
    const task = await prisma.task.findFirst({
        where: { id: taskId, userId },
        include: { user: true }
    });

    if (!task) throw new appError("Task not found", 404);
    return task;
};


const createTask = async (context) => {
    const { title, userId } = context;

    const newTask = await prisma.task.create({ data: { title, userId }, include: { user: true } });


    logsService.createLog({
        action: "TASK_CREATED",
        description: `User ${newTask.user.name} created task ${newTask.title}`,
        userId: newTask.userId,
        ipAddress: context.ip
    })

    return newTask;
}

const getUserTasks = async (userId) => {

    return await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
};


const updateTask = async (context) => {

    const { userId, taskId, data } = context;

    const task = await getOwnedTask(taskId, userId);

    const updatedTask = await prisma.task.update({ where: { id: taskId }, data });


    logsService.createLog({
        action: "TASK_UPDATED",
        description: `User ${task.user.name} updated task ${task.title}`,
        userId: task.userId,
        ipAddress: context.ip
    })

    return updatedTask;
};


const deleteTask = async (context) => {

    const { taskId, userId } = context;

    const task = await getOwnedTask(taskId, userId);

    await prisma.task.delete({ where: { id: taskId } });

    logsService.createLog({
        action: "TASK_DELETED",
        description: `User ${task.user.name} deleted task `,
        userId: task.userId,
        ipAddress: context.ip
    })

    return { message: "Task deleted successfully" };
};





module.exports = { createTask, getUserTasks, updateTask, deleteTask }