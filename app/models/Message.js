const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ChatLogs', MessageSchema);