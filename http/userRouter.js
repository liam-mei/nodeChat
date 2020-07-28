const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

const db = require("../database/models");

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
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      next({ status: 400, message: "username not valid" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      const token = jwt.sign({ name: user.name }, secrets.secret, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.json({ message: `Welcome ${user.username}` });
    } else {
      next({ status: 401, message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
