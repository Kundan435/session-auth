import Joi from 'joi'

export const registerSchema = Joi.object({
    email: Joi.string().email().max(254).lowercase().trim().required(),
    name: Joi.string().min(3).max(128).trim().required(),
    password: Joi.string().min(8).max(128).required(), // TODO max
    passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
})