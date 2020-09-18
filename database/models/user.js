const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
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
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    { tableName: "users" }
  );

  user.associate = (models) => {
    user.hasMany(models.message, {
      foreignKey: "userId",
      // onDelete: "SET NULL",
    });
    user.belongsToMany(models.room, {
      through: models.roomUser,
    });
  };

  return user;
};
