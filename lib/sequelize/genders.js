const { DataTypes, Model } = require("sequelize");

class Genders extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Genders,
};

function init(sequelizeDb) {
  Genders.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Genders", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Genders === sequelizeDb.models.Genders) {
    return [null];
  } else {
    return ["Can't init Genders model"];
  }
}

function initRelation({}) {}
