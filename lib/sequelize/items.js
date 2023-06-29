const { DataTypes, Model } = require("sequelize");

class Items extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Items,
};

function init(sequelizeDb) {
  Items.init(
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Items", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Items === sequelizeDb.models.Items) {
    return [null];
  } else {
    return ["Can't init Items model"];
  }
}

function initRelation({}) {}
