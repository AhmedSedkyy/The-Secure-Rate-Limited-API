const validatorMiddleware = require('../middleware/validatorMiddleware');
const Joi = require('joi');

const registerValidation = validatorMiddleware(Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .trim()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }));

const loginValidation = validatorMiddleware(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    }));

    
module.exports = {registerValidation,loginValidation};