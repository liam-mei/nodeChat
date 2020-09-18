module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      message: {
        type: DataTypes.STRING,
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    { tableName: "messages" }
  );

  message.associate = (models) => {
    message.belongsTo(models.user, {
      foreignKey: "userId",
      // onDelete: "SET NULL",
    });
    message.belongsTo(models.room, {
      foreignKey: "roomId",
      // onDelete: "SET NULL",
    });
  };

  return message;
};
