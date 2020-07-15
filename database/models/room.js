module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: DataTypes.STRING,
  });

  Room.associate = (models) => {
    Room.hasMany(models.Message, {
      // foreignKey: "message_id",
      // onDelete: "SET NULL",
    });
    Room.belongsToMany(models.User, {
      through: "RoomUsers",
    });
  };

  return Room;
};
