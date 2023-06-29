const { DataTypes, Model } = require("sequelize");

class OrdersItemsRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  OrdersItemsRelations,
};

function init(sequelizeDb) {
  OrdersItemsRelations.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "OrdersItemsRelations", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (OrdersItemsRelations === sequelizeDb.models.OrdersItemsRelations) {
    return [null];
  } else {
    return ["Can't init OrdersItemsRelations model"];
  }
}

function initRelation({ Orders, Items }) {
  OrdersItemsRelations.belongsTo(Orders, {
    foreignKey: {
      allowNull: false,
    },
  });
  OrdersItemsRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
    },
  });
}
