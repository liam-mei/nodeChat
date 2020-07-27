module.exports = (sequelize, DataTypes) => {
  const RoomUser = sequelize.define("RoomUser", {
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
  });

  RoomUser.associate = (models) => {};

  return RoomUser;
};
