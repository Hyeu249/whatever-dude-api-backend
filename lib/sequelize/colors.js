const { DataTypes, Model } = require("sequelize");

class Colors extends Model {}

const colors = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Colors,
};

module.exports = colors;

function init(sequelizeDb) {
  Colors.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hex_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Colors", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Colors === sequelizeDb.models.Colors) {
    return [null];
  } else {
    return ["Can't init Colors model"];
  }
}

function initRelation({}) {}
