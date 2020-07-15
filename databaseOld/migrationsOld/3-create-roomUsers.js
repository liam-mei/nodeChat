"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable("RoomUsers", {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: "Users",
    //   },
    // },
    // roomId: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: "Rooms",
    //   },
    // },
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("RoomUsers");
  },
};
