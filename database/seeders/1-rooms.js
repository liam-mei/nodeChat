"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("rooms", [
      {
        name: "room1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "room2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "room3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
