"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "TodoItems",
      [
        {
          content: "John Doe",
          complete: true,
          todoId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   content: "Jane Doe",
        //   todoId: 3,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TodoItems", null, {});
  },
};
