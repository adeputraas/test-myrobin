const formatMessage = require("../utils/messages.js");

module.exports = (app, io) => {
  const room = require("../controllers/room.controller.js");

  var router = require("express").Router();

  // Create a room
  router.post("/create-room", room.create);

  // Retrieve detail Rooms's
  router.get("/rooms/:roomName", room.findRoomByName);

  // Retrieve detail Rooms's
  router.get("/chat-logs/:roomName", room.chatLogs);

  // User Joined
  // router.post("/join", room.joinRoom);

  io.on("connection", (socket) => {
    console.log(`User with ${socket.id} has connected`);

    socket.on("join", async (detailUser) => {
      const dto = {
        ...detailUser,
        idSocket: socket.id,
      };
      const response = await room.joinRoom(dto);
      socket.join(dto.roomName);
      socket.emit('isJoined', response);
    });

    socket.on("leaveRoom", async () => {
      await room.leaveRoom({idSocket: socket.id});
    })

    // Welcome current user
    socket.emit(
      "message",
      formatMessage({ userName: "Bot", message: "Welcome to Room" })
    );

    //Broadcast when a user connects
    socket.broadcast.emit("message", "A user has joined chat!");

    socket.on("disconnect", async () => {
      io.emit("message", "A use has left chat");
    });

    socket.on("chatMessage", (msg) => {
      room.chatMessage(msg, io);
    });
  });

  app.use("/", router);
};
