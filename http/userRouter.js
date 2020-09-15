const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

const { UserAccessObject, RoomAccessObject } = require("../dataAccessObjects");

const router = express.Router({
  mergeParams: true,
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      status: 400,
      message: "please fill out both username and password",
    });
    return;
  }

  try {
    const user = await UserAccessObject.findOne({ username });

    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      const token = jwt.sign(
        { username: user.username, id: user.id },
        secrets.secret,
        {
          // expiresIn: "7d",
          expiresIn: secrets.tokenExpiration,
        }
      );

      res.json({ message: `Welcome ${user.username}`, token, user });
    } else {
      next({ status: 401, message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    next({
      status: 400,
      error: "please fill out both username and password",
    });

  try {
    const userExists = await UserAccessObject.findOne({ username });
    if (userExists) {
      next({ status: 400, error: "Username already exists" });
    } else {
      const newUser = await UserAccessObject.create({ username, password });

      const token = jwt.sign(
        { username: user.username, id: user.id },
        secrets.secret,
        {
          // expiresIn: "7d",
          expiresIn: "10000000",
        }
      );

      res.status(201).json({ newUser, token });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
