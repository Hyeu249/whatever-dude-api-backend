const { DataTypes, Model } = require("sequelize");

class Users extends Model {}

module.exports = {
  schema: { init },
  relation: {
    init: initRelation,
  },
  Users,
};

function init(sequelizeDb) {
  Users.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Users", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Users === sequelizeDb.models.Users) {
    return [null];
  } else {
    return ["Can't init Users model"];
  }
}

function initRelation({ Reviews, Orders, Images }) {
  Users.hasMany(Reviews);
  Users.hasMany(Orders);
  Users.hasMany(Images);
}
