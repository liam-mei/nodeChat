module.exports = (sequelize, DataTypes) => {
  const roomUser = sequelize.define(
    "roomUser",
    {
      userId: { type: DataTypes.INTEGER, references: { model: 'user' } },
      roomId: { type: DataTypes.INTEGER, references: { model: 'room' } },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    { tableName: "roomUsers" }
  );

  roomUser.associate = (models) => {
    roomUser.belongsTo(models.user, {
      foreignKey: "userId",
      // onDelete: "SET NULL",
    });
    roomUser.belongsTo(models.room, {
      foreignKey: "roomId",
      // onDelete: "SET NULL",
    });
  };

  return roomUser;
};
