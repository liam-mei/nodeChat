const socketIO = require("socket.io");

const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

const httpServer = require("../http/httpServer");
const {
  MessageAccessObject,
  RoomAccessObject,
} = require("../dataAccessObjects");

const io = socketIO(httpServer);

io.use(function (socket, next) {
  console.log(socket.handshake.query);
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, secrets.secret, function (
      err,
      decoded
    ) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    console.log("auth error");
    next(new Error("Authentication error"));
  }
}).on("connection", async (socket) => {
  console.log("a client connected");
  setTimeout(() => {
    socket.disconnect();
  }, secrets.tokenExpiration);

  // socket.on('clientTopSocketTest', data => {
  //   console.log(data)
  // })

  socket.on("getRooms", async () => {
    console.log("getting Rooms");
    // want to change to get rooms ordered by last message
    const currentRooms = await RoomAccessObject.find();

    socket.emit("rooms", currentRooms);
  });

  socket.on("joinRoom", async (id) => {
    const rooms = Object.keys(socket.rooms);
    // console.log({rooms});
    // console.log({ roomToLeave });
    if (rooms.length > 1) {
      socket.leave(rooms[0]);
      console.log(`I left room: ${rooms[0]}`);
    }
    socket.join(id);
    console.log(`someone joined roomId: ${id}`);

    const roomMessages = await MessageAccessObject.find(
      { room_id: id },
      ["User"],
      ["id"]
    );
    socket.emit("currentMessages", roomMessages);
  });

  socket.on("sendMessage", (data) => {
    console.log(`received message: ${JSON.stringify(data)}`);
    try {
      const decodedToken = jwt.decode(data.token, secrets.secret);
      delete data.token;
      socket.to(data.room_id).emit("newMessage", data);
      MessageAccessObject.create({
        room_id: data.room_id,
        message: data.message,
        user_id: decodedToken.id,
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("something disconnected");
    // socket.disconnect();
  });

  socket.on("logOff", () => {
    socket.disconnect();
  });
});

module.exports = io;
