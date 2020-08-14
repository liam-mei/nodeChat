const socketIO = require("socket.io");

const httpServer = require("../http/httpServer");
const {
  MessageAccessObject,
  RoomAccessObject,
} = require("../dataAccessObjects");

const io = socketIO(httpServer);

io.on("connection", async (socket) => {
  console.log("a client connected");

  socket.on("getRooms", async () => {
    console.log("getting Rooms");
    const currentRooms = await RoomAccessObject.find();

    socket.emit("rooms", currentRooms);
  });

  socket.on("joinRoom", async (id) => {
    const roomToLeave = Object.keys(socket.rooms)[1];
    socket.leave(roomToLeave);
    socket.join(id);
    console.log(`someone joined roomId: ${id}`);

    const roomMessages = await MessageAccessObject.find({ room_id: id });
    socket.emit("currentMessages", roomMessages);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("newMessage", data.message);
  });
});

module.exports = io;
