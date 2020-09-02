const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

function restricted(req, res, next) {
  try {
    // const token = req.cookies.token;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secrets.secret);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    next({ status: 401, message: "Invalid Credentials", err });
  }
}

function sanityCheck(req, res, next) {
  res.json({ message: "I work" });
}

// Wrong Route Handler
function wrongRoute(req, res, next) {
  res.status(401).json({ error: "Route does not exist" });
}

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  console.log("Global Error: ", err);
  res.status(err.status || 500).json({ err });
};

module.exports = { restricted, sanityCheck, wrongRoute, globalErrorHandler };
