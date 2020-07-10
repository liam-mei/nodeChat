const express = require("express");
const userRouter = require('./userRouter');

// I probably want helmet and cors

const server = express();

// Middleware
server.use(express.json());

// Routers
server.use('/users', userRouter);

// Sanity Check Route
server.get("/", (req, res, next) => {
  res.json({ message: "I work" });
});

// Wrong Route Handler
server.use((req, res) => {
  res.status(401).json({ error: "Route does not exist" });
});

// Global Error Handler
server.use((err, req, res, next) => {
  console.log("Global Error: ", err);
  res.status(err.status || 500).json({ message: err.message, err });
});

module.exports = server;