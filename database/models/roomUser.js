module.exports = (sequelize, DataTypes) => {
  const RoomUser = sequelize.define(
    "RoomUser",
    {
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { tableName: "room_users" }
  );

  RoomUser.associate = (models) => {};

  return RoomUser;
};
