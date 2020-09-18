module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    "room",
    {
      name: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },
    },
    { tableName: "rooms" }
  );

  room.associate = (models) => {
    room.hasMany(models.message, {
      foreignKey: "roomId",
      // onDelete: "SET NULL",
    });
    room.belongsToMany(models.user, {
      through: models.roomUser,
    });
  };

  return room;
};
