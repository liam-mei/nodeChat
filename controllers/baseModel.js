const { User, Message, Room, RoomUsers } = require("../database/models");

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

module.exports = {};
