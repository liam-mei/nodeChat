module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      // foreignKey: "message_id",
      // onDelete: "SET NULL",
    });
    User.belongsToMany(models.Room, {
      through: "RoomUsers",
    });
  };

  return User;
};
