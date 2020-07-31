const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

const { UserAccessModel, RoomAccessModel } = require("../accessModels");

const router = express.Router({
  mergeParams: true,
});

router.get("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    next({
      status: 400,
      message: "please fill out both username and password",
    });

  try {
    const user = await UserAccessModel.findOne({ username });
    if (!user) {
      next({ status: 400, message: "username not valid" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      const token = jwt.sign({ username: user.username, id: user.id }, secrets.secret, {
        expiresIn: "7d",
      });

      // I would use a httpOnly cookie but a token is required to
      // authenticate for socket
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // httpOnly: true,
      });
      res.json({ message: `Welcome ${user.username}` });
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
      message: "please fill out both username and password",
    });

  try {
    const userExists = await UserAccessModel.findOne({ username });
    if (userExists) res.status(400).json({ error: "username already exists" });

    const newUser = await UserAccessModel.create({ username, password });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
