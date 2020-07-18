const socketIO = require("socket.io");

const httpServer = require("../http/httpServer");
const db = require("../database/models");

const io = socketIO(httpServer);

io.on("connection", (socket) => {
  console.log("a client connected");
  socket.emit('rooms', [1,2,3])
});

module.exports = io;
