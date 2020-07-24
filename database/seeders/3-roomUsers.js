"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("RoomUsers", [
      {
        userId: 1,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        roomId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        roomId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        roomId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        roomId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("RoomUsers", null, {});
  },
};
