module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    name: {
      type: DataTypes.STRING,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "SET NULL",
    });
    Message.belongsTo(models.Room, {
      foreignKey: "room_id",
      onDelete: "SET NULL",
    });
  };

  return Message;
};
