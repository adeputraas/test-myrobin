const Joi = require('joi');

exports.validateJoinedRoom = async (newRoom) => {

    const schema = Joi.object({
        userName: Joi.string().required(),
        roomName: Joi.string().required(),
        idSocket: Joi.string().required()
    }).required();

    try {
        const response = await schema.validateAsync(newRoom);
        return response;
    } catch (error) {
        throw error.details[0].message;
    }
};

exports.createRoom = async (newRoom) => {

    const schema = Joi.object({
        // _id: Joi.string().guid({version: ['uuidv5']}),
        roomName: Joi.string().required()
    }).required();

    try {
        const response = await schema.validateAsync(newRoom);
        return response;
    } catch (error) {
        throw error.details[0].message;
    }
};