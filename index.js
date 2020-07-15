const server = require("./http/httpServer");
const secrets = require("./secrets");
const db = require("./database/models").sequelize;

const PORT = secrets.port;

db.authenticate({ force: true })
  .then(() => console.log("I connected"))
  .catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});
