const { User } = require("../database/models");

function createUser(username, password) {
  return User.insert({ username, password });
}

function findAllUsers() {
  return User.findAll();
}

// query is an object
function findOneUser(query) {
  return User.findOne({ where: query });
}

module.exports = {
  createUser,
  findAllUsers,
  findOneUser,
};
