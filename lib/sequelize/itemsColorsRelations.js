const { DataTypes, Model } = require("sequelize");

class ItemsColorsRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  ItemsColorsRelations,
};

function init(sequelizeDb) {
  ItemsColorsRelations.init(
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
      modelName: "ItemsColorsRelations", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (ItemsColorsRelations === sequelizeDb.models.ItemsColorsRelations) {
    return [null];
  } else {
    return ["Can't init ItemsColorsRelations model"];
  }
}

function initRelation({ Items, Colors }) {
  ItemsColorsRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
    },
  });
  ItemsColorsRelations.belongsTo(Colors, {
    foreignKey: {
      allowNull: false,
    },
  });
}
