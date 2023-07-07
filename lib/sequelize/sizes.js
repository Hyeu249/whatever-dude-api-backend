const { DataTypes, Model } = require("sequelize");

class Sizes extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Sizes,
};

function init(sequelizeDb) {
  Sizes.init(
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
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Sizes", // We need to choose the model name,
      underscored: true,
    }
  );

  if (Sizes === sequelizeDb.models.Sizes) {
    return [null];
  } else {
    return ["Can't init Sizes model"];
  }
}

function initRelation({ Items, ItemsSizesRelations, OrdersAndRelatedInfos }) {
  Sizes.belongsToMany(Items, {
    through: ItemsSizesRelations,
    foreignKey: {
      name: "size_id",
      allowNull: false,
    },
  });
  Sizes.hasMany(OrdersAndRelatedInfos);
}
