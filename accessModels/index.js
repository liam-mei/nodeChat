const userController = require("./userController");
const {
  UserAccessModel,
  MessageAccessModel,
  RoomAccessModel,
  RoomUserAccessModel,
} = require("./baseModel");

module.exports = {
  userController,
  UserAccessModel,
  MessageAccessModel,
  RoomAccessModel,
  RoomUserAccessModel,
};
