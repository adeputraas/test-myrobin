const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    idSocket: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('RoomLog', RoomSchema);