const { DataTypes, Model } = require("sequelize");

class ItemsSizesRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  ItemsSizesRelations,
};

function init(sequelizeDb) {
  ItemsSizesRelations.init(
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
      modelName: "ItemsSizesRelations", // We need to choose the model name,
      underscored: true,
    }
  );

  if (ItemsSizesRelations === sequelizeDb.models.ItemsSizesRelations) {
    return [null];
  } else {
    return ["Can't init ItemsSizesRelations model"];
  }
}

function initRelation({ Items, Sizes }) {
  ItemsSizesRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
      name: "item_id",
    },
  });
  ItemsSizesRelations.belongsTo(Sizes, {
    foreignKey: {
      allowNull: false,
      name: "size_id",
    },
  });
}
