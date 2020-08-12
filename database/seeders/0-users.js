"use strict";

const bcrypt = require("bcryptjs");
const hash = async (password) => await bcrypt.hash(password, 12);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        username: "user1",
        password: await hash("password"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "user2",
        password: await hash("password"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "user3",
        password: await hash("password"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
