const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        this.setDataValue("password", hashedPassword);
      },
    },
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
