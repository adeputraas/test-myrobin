const Room = require("../models/Room");
const RoomLog = require("../models/RoomLog");
const MessageSchema = require("../models/Message");
const { createRoom, validateJoinedRoom } = require("../validator/rooms.validator");
const moment = require('moment');
const uuidv4 = require('uuid');


exports.create = async (req, res) => {
  try {
    const validate = await createRoom(req.body);
    const room = new Room({_id: uuidv4.v4(), roomName: validate.roomName, createdAt: moment(new Date()).format('YYYY-MM-DD')});
    const response = await room.save();

    res.status(200).send({
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.findRoomByName = async (req, res) => {
  try {
    const response = await Room.find({roomName: req.params.roomName});
    res.status(200).send({
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
};

exports.joinRoom = async (dto) => {
  try {
    const validate = await validateJoinedRoom(dto);
    const response = await RoomLog.find({roomName: validate.roomName, userName: validate.userName, status: 'Joined'});
    if(response.length){
      return {
        error: true,
        message: `Username ${validate.userName} already joined. Use other username.`
      };
    }else{
      const roomLog = new RoomLog({_id: uuidv4.v4(), idSocket: dto.idSocket, roomName: validate.roomName, userName: validate.userName, status:'Joined', createdAt: moment(new Date()).format('YYYY-MM-DD')});
      await roomLog.save();
    }
    return {
      error: false,
      message: dto.idSocket
    };
  } catch (error) {
    return {
      error: true,
      message: error
    };
  }
}

exports.chatLogs = async (req, res) => {
  try {
    const response = await MessageSchema.find({roomName: req.params.roomName});
    res.status(200).send({
      message: "Success",
      data: response
    });
  } catch (error) {
    res.status(400).send({ status: "Bad Request", message: error.message });
  }
}

exports.chatMessage = async (msg, io) => {
  const message = new MessageSchema({_id: uuidv4.v4(), roomName: msg.roomName, userName: msg.userName, message: msg.message, createdAt: moment(new Date()).format('YYYY-MM-DD'), time: moment(new Date()).format('h:mm:a')});
  await message.save();
  io.to(msg.roomName).emit(`${msg.roomName}-message-received`, message);
}

exports.leaveRoom = async (dto) => {
  const query = { idSocket: dto.idSocket};
  const response = await RoomLog.findOneAndUpdate(query, {status: 'Leave'}, { new: true});
}