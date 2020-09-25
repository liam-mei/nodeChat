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

// This is a list of all clients
const clients = {};

io.use(function (socket, next) {
  console.log(socket.handshake.query);
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, secrets.secret, function (
      err,
      decoded
    ) {
      if (err) return next(new Error("Authentication error"));
      socket.user = decoded;

      // can use username or can use userId.  Which is better???!!!
      clients[decoded.username] = socket;
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
  socket.on("getRooms", async () => {
    console.log("getting userRooms");

    // Original Take querying for all rooms
    const userRooms = await RoomAccessObject.find({
      attributes: ["id", "name"],
      include: [
        {
          model: message,
          attributes: ["id", "roomId", "message", "userId", "createdAt"],
          limit: 1,
          order: [["id", "DESC"]],
          // duplicating: false,
          // separate: true,
          include: [
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          where: { username: socket.user.username },
          through: { attributes: [] },
        },
      ],
      order: [["id", "DESC"]],
      // order: [[ message, "id", "DESC"]],
      // // order: [[Sequelize.literal(`messages.id`), `DESC`]],
      // subQuery: false,
      separate: true,
    });
    // console.log(userRooms)

    let roomObject = {};
    for (let room of userRooms) {
      roomObject["r" + room.id] = room;
    }

    socket.emit("userRooms", roomObject);
  });

  // ======== GET ROOM ==========
  socket.on("getRoom", async (id) => {
    // GETTING RID OF JOINING DIFFERENT ROOMS.  MESSAGES ARE NOW SENT VIA USERS
    // const rooms = Object.keys(socket.rooms);
    // if (rooms.length > 1) {
    //   socket.leave(rooms[0]);
    //   console.log(`I left room: ${rooms[0]}`);
    // }
    // socket.join(id);
    // console.log(`someone joined roomId: ${id}`);

    const currentRoom = await RoomAccessObject.findOne({
      attributes: ["id", "name"],
      include: [
        {
          model: message,
          attributes: ["id", "roomId", "message", "userId", "createdAt"],
          limit: 50,
          // order: [["id", "DESC"]],
          include: [
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          through: { attributes: [] },
        },
      ],
      order: [["id", "DESC"]],
      where: { id },
    });
    console.log("sending room****************");

    socket.emit("currentRoom", currentRoom);
  });

  socket.on("sendMessage", async (newMessage) => {
    console.log(`received message: ${JSON.stringify(newMessage)}`);

    // do I want to be constantly decoding?  I don't think so.  But here is an example of how you would do that
    // try {
    //   const decodedToken = jwt.decode(data.token, secrets.secret);
    //   delete data.token;
    //   socket.to(data.roomId).emit("newMessage", data);
    //   MessageAccessObject.create({
    //     roomId: data.room_id,
    //     message: data.message,
    //     userId: decodedToken.id,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const { message, roomId, users } = newMessage;
      const userId = socket.user.id;

      MessageAccessObject.create({
        roomId,
        message,
        userId,
      });
      console.log(clients)

      users.forEach((user) => {
        if (clients[user.username] && socket.user.username !== user.username) {
          console.log('found user socket =============')
          clients[user.username].emit('newMessage', {
            message: { message, user: { username: socket.user.username } },
            room: "r" + roomId,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.user.username} disconnected`);
    // socket.disconnect();
    delete clients[socket.user.username];
  });

  socket.on("logOff", () => {
    socket.disconnect();
    delete clients[socket.user.username];
  });
});

module.exports = io;
