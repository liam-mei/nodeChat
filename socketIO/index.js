const socketIO = require("socket.io");

const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

// testing nested query
const { user, message, room, roomUser } = require("../database/models");

const httpServer = require("../http/httpServer");
const {
  MessageAccessObject,
  RoomAccessObject,
  RoomUserAccessObject,
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

  //======= GET ROOMS =====
  socket.on("getRooms", async (username) => {
    console.log("getting Rooms");

    // Original Take querying for all rooms
    const currentRooms = await RoomAccessObject.find({
      attributes: ["id", "name"],
      include: [
        {
          model: message,
          attributes: ["id", "roomId", "message", "userId", 'createdAt'],
          limit: 1,
          order: [["id", "DESC"]],
          include: [
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          where: { username: username || 'user2' },
          through: { attributes: [] },
        },
      ],
      order: [["id", "DESC"]],
    });

    let roomObject = {};
    for (let room of currentRooms) {
      roomObject[room.name] = room;
    }


    socket.emit("rooms", roomObject);
  });

  // ======== JOIN ROOM ==========
  socket.on("joinRoom", async (id) => {
    const rooms = Object.keys(socket.rooms);
    if (rooms.length > 1) {
      socket.leave(rooms[0]);
      console.log(`I left room: ${rooms[0]}`);
    }
    socket.join(id);
    console.log(`someone joined roomId: ${id}`);

    const roomMessages = await MessageAccessObject.find({
      where: { roomId: id },
      include: [user],
      order: ["id"],
    });

    socket.emit("currentMessages", roomMessages);
  });

  socket.on("sendMessage", async (data) => {
    console.log(`received message: ${JSON.stringify(data)}`);
    try {
      const decodedToken = jwt.decode(data.token, secrets.secret);
      delete data.token;
      socket.to(data.roomId).emit("newMessage", data);
      MessageAccessObject.create({
        roomId: data.room_id,
        message: data.message,
        userId: decodedToken.id,
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
