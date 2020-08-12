"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("messages", [
      {
        message: "message 1",
        user_id: 1,
        room_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 2",
        user_id: 2,
        room_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 3",
        user_id: 1,
        room_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 4",
        user_id: 2,
        room_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 5",
        user_id: 2,
        room_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 6",
        user_id: 3,
        room_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 7",
        user_id: 3,
        room_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 8",
        user_id: 2,
        room_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        message: "message 9",
        user_id: 3,
        room_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("messages", null, {});
  },
};
