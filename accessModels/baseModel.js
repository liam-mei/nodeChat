const { User, Message, Room, RoomUser } = require("../database/models");

class DataAccessModel {
  constructor(model) {
    this.model = model;
  }

  find(filter = {}) {
    return this.model.findAll({ where: filter });
  }

  findOne(filter) {
    return this.model.findOne({ where: filter });
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

const UserAccessModel = new DataAccessModel(User);
const MessageAccessModel = new DataAccessModel(Message);
const RoomAccessModel = new DataAccessModel(Room);
const RoomUserAccessModel = new DataAccessModel(RoomUser);

module.exports = {
  UserAccessModel,
  MessageAccessModel,
  RoomAccessModel,
  RoomUserAccessModel,
};
