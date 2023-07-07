const { DataTypes, Model } = require("sequelize");

class OrdersAndRelatedInfos extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  OrdersAndRelatedInfos,
};

function init(sequelizeDb) {
  OrdersAndRelatedInfos.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: { min: 1 },
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "OrdersAndRelatedInfos", // We need to choose the model name,
      underscored: true,
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["order_id", "item_id", "color_id", "size_id"],
        },
      ],
    }
  );

  if (OrdersAndRelatedInfos === sequelizeDb.models.OrdersAndRelatedInfos) {
    return [null];
  } else {
    return ["Can't init OrdersAndRelatedInfos model"];
  }
}

function initRelation({ Orders, Items, Colors, Sizes }) {
  OrdersAndRelatedInfos.belongsTo(Orders, {
    foreignKey: {
      allowNull: false,
      name: "order_id",
    },
  });
  OrdersAndRelatedInfos.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
      name: "item_id",
    },
  });
  OrdersAndRelatedInfos.belongsTo(Colors, {
    foreignKey: {
      allowNull: false,
      name: "color_id",
    },
  });
  OrdersAndRelatedInfos.belongsTo(Sizes, {
    foreignKey: {
      allowNull: false,
      name: "size_id",
    },
  });
}
