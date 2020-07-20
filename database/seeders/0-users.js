"use strict";

const bcrypt = require("bcryptjs");
const hash = async (password) => await bcrypt.hash(password, 12);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "user1",
        password: await hash("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        password: await hash("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user3",
        password: await hash("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
