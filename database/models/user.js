const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, unique: true },
      password: {
        type: DataTypes.STRING,
        set(password) {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" },
    },
    { tableName: "users" }
  );

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: "user_id",
      // onDelete: "SET NULL",
    });
    User.belongsToMany(models.Room, {
      through: "RoomUsers",
    });
  };

  return User;
};
