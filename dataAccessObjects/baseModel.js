const { user, message, room, roomUser } = require("../database/models");

class DataAccessModel {
  constructor(model) {
    this.model = model;
  }

  find(query = {}) {
    return this.model.findAll(query);
  }

  findOne(query = {}) {
    return this.model.findOne(query);
  }

  create(attributes) {
    return this.model.create(attributes);
  }

  update(id, updates) {
    return this.findOne({ id }).update(updates);
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

const UserAccessObject = new DataAccessModel(user);
const MessageAccessObject = new DataAccessModel(message);
const RoomAccessObject = new DataAccessModel(room);
const RoomUserAccessObject = new DataAccessModel(roomUser);

module.exports = {
  UserAccessObject,
  MessageAccessObject,
  RoomAccessObject,
  RoomUserAccessObject,
};
