const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const secrets = require("../secrets");
// const db = require("../database/models");
const { RoomAccessModel, RoomUserAccessModel } = require("../accessModels");

const router = express.Router({
  mergeParams: true,
});

router.get("/listrooms", async (req, res, next) => {
  try {
    res.json(await RoomAccessModel.find());
  } catch (error) {
    next(error);
  }
});

router.get("/listrooms/:query", async (req, res, next) => {
  const { query } = req.params;
  try {
    res.json(await RoomAccessModel.find({ name: query }));
  } catch (error) {
    next(error);
  }
});

router.post("/joinroom/:roomId", async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const joinedRoom = await RoomUserAccessModel.create({
      roomId,
      userId: req.user.id,
    });

    res.json(joinedRoom);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
