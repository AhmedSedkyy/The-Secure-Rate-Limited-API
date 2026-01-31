const validatorMiddleware = require('../middleware/validatorMiddleware');
const Joi = require('joi');

const createTaskValidation = validatorMiddleware(Joi.object({
    title: Joi.string()
    .alphanum()
    .trim()
    .min(3)
    .max(100)
    .required(),
    status: Joi.string()
    .valid('PENDING', 'IN_PROGRESS', 'COMPLETED')
    .default('PENDING')
}));

const updateTaskValidation = validatorMiddleware(Joi.object({
    title: Joi.string()
    .alphanum()
    .trim()
    .min(3)
    .max(100),
    status: Joi.string()
    .valid('PENDING', 'IN_PROGRESS', 'COMPLETED')
    ,}).min(1)); 


const taskIdValidation = validatorMiddleware(Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .required()
}))


module.exports = {createTaskValidation, updateTaskValidation, taskIdValidation};