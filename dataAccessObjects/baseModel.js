const { User, Message, Room, RoomUser } = require("../database/models");

class DataAccessModel {
  constructor(model) {
    this.model = model;
  }

  find(where = {}, include = [], order = []) {
    return this.model.findAll({ where, include, order });
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

const UserAccessObject = new DataAccessModel(User);
const MessageAccessObject = new DataAccessModel(Message);
const RoomAccessObject = new DataAccessModel(Room);
const RoomUserAccessObject = new DataAccessModel(RoomUser);

module.exports = {
  UserAccessObject,
  MessageAccessObject,
  RoomAccessObject,
  RoomUserAccessObject,
};
