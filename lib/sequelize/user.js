const { DataTypes, Model } = require("sequelize");

class User extends Model {}

const user = {
  schema: { Init },
  relation: {
    Init: InitRelation,
  },
  Model: User,
};

module.exports = user;

function Init(sequelizeDb) {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (User === sequelizeDb.models.User) {
    return [null];
  } else {
    return ["Can't init User model"];
  }
}

function InitRelation({ Image, Collection }) {}
