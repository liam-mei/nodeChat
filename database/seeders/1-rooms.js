"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("rooms", [
      {
        name: "room1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "room2",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "room3",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
