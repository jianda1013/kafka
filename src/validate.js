const Joi = require('joi');

const adminRequest = Joi.object({
    username: Joi.string().required().equal(process.env.admin || "admin")
})

const userRequest = Joi.object({
    username: Joi.string().required()
})

const channelRequest = Joi.object({
    username: Joi.string().required(),
    channel: Joi.string().regex(/^[a-zA-Z0-9][\w]{2,24}$/).required()
})

module.exports = { adminRequest, userRequest, channelRequest }