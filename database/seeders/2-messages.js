"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Messages", [
      {
        message: "message 1",
        userId: 1,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 2",
        userId: 2,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 3",
        userId: 1,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 4",
        userId: 2,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 5",
        userId: 2,
        roomId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 6",
        userId: 3,
        roomId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 7",
        userId: 3,
        roomId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 8",
        userId: 2,
        roomId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "message 9",
        userId: 3,
        roomId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Messages", null, {});
  },
};
