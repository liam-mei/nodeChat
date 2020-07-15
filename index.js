const server = require("./http/httpServer");
const secrets = require("./secrets");
const db = require("./databaseOld/modelsOld");

// const { User, Message, Room } = db;

// User.hasMany(Message);
// Message.belongsTo(User);

// console.log(User())


const PORT = secrets.port;

server.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});
