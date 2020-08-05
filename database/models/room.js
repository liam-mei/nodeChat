module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { tableName: "rooms" }
  );

  Room.associate = (models) => {
    Room.hasMany(models.Message, {
      foreignKey: "room_id"
      // onDelete: "SET NULL",
    });
    Room.belongsToMany(models.User, {
      through: "RoomUsers",
    });
  };

  return Room;
};
