module.exports = (sequelize, DataTypes) => {
  const RoomUser = sequelize.define("RoomUser", {
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // password: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false
    // },
  });

  // RoomUser.associate = (models) => {
  //   RoomUser.hasMany(models.User, {
  //     foreignKey: "user_id",
  //     onDelete: "SET NULL",
  //   });
  //   RoomUser.belongsTo(models.Room, {
  //     foreignKey: "user_id",
  //     onDelete: "SET NULL",
  //   });
  // };

  return RoomUser;
};
