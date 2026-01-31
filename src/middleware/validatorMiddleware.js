const AppError = require('../utils/appError');

const validate = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.params, ...req.body };

        const { error, value } = schema.validate(inputData, { abortEarly: false,stripUnknown: true });

        if (error) {
        const message = error.details.map((d) => d.message).join(', ');
        return next(new AppError(message, 400));
        }

        for (let key in req.params) {
            if (value[key]) {
                req.params[key] = value[key]; 
            }
        }
        next();
    };
};

module.exports = validate;