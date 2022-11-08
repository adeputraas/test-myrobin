const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Room', RoomSchema);