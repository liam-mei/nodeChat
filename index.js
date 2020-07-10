const server = require('./http/httpServer');
const secrets = require('./secrets')

const PORT = secrets.port;

server.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});