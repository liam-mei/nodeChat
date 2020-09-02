const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./userRouter");
const protectedRouter = require("./protectedRouter");
const {
  restricted,
  sanityCheck,
  wrongRoute,
  globalErrorHandler,
} = require("./middleware");
const secrets = require("../secrets");

const app = express();

// Middleware
app.use(cookieParser(), helmet(), cors(), express.json());

// Routers
app.use("/users", userRouter);
app.use("/protected", restricted, protectedRouter);

// Sanity Check Route
app.get("/", sanityCheck);

// Wrong Route Handler
app.use(wrongRoute);

// Global Error Handler
app.use(globalErrorHandler);

const PORT = secrets.port;

const server = app.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});

module.exports = server;
