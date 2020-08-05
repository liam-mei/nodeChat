module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: {
        type: DataTypes.STRING,
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { tableName: "messages" }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      // onDelete: "SET NULL",
    });
    Message.belongsTo(models.Room, {
      foreignKey: "room_id",
      // onDelete: "SET NULL",
    });
  };

  return Message;
};
