const { DataTypes, Model } = require("sequelize");

class Orders extends Model {}

const orders = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Orders,
};

module.exports = orders;

function init(sequelizeDb) {
  Orders.init(
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Orders", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Orders === sequelizeDb.models.Orders) {
    return [null];
  } else {
    return ["Can't init Orders model"];
  }
}

function initRelation({}) {}
