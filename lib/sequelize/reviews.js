const { DataTypes, Model } = require("sequelize");

class Reviews extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Reviews,
};

function init(sequelizeDb) {
  Reviews.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      star: {
        type: DataTypes.DECIMAL(2, 1),
        validate: {
          min: 0, // Minimum value
          max: 5, // Maximum value
        },
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Reviews", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Reviews === sequelizeDb.models.Reviews) {
    return [null];
  } else {
    return ["Can't init Reviews model"];
  }
}

function initRelation({}) {}
