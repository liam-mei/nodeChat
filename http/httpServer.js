const express = require("express");
const userRouter = require("./userRouter");
const secrets = require("../secrets");

const app = express();
// I probably want helmet, morgan (logging middleware) and cors


// Middleware
app.use(express.json());

// Routers
app.use("/users", userRouter);

// Sanity Check Route
app.get("/", (req, res, next) => {
  res.json({ message: "I work" });
});

// Wrong Route Handler
app.use((req, res) => {
  res.status(401).json({ error: "Route does not exist" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Global Error: ", err);
  res.status(err.status || 500).json({ err });
});
const PORT = secrets.port;

const server = app.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});

module.exports = server;
