"use strict";

const bcrypt = require("bcryptjs");
const hash = async (password) => await bcrypt.hash(password, 12);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "derrick",
        password: await hash("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "kevin",
        password: await hash("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "david",
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
