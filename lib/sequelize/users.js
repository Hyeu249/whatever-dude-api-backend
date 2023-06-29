const { DataTypes, Model } = require("sequelize");

class Users extends Model {}

const users = {
  schema: { init },
  relation: {
    init: initRelation,
  },
  Users,
};

module.exports = users;

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

function initRelation({}) {}
