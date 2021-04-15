// Validation
const joi = require('@hapi/joi');


//Register Validation
const registerValidation = data => {
    const schema = joi.object({
        name: joi.string()
            .min(6)
            .required(),
        email: joi.string()
            .min(6).
            required().
            email(),
        password: joi.string().
            min(6).
            required()
    });
    return schema.validate(data);
}

//Login Validation
const loginValidation = data => {
    const schema = joi.object({
        name: joi.string()
            .min(6)
        ,
        email: joi.string()
            .min(6).
            required().
            email(),
        password: joi.string().
            min(6).
            required()
    });
    return schema.validate(data);
}


module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;