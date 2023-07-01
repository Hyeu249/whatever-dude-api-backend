const { DataTypes, Model } = require("sequelize");

class ItemsTopicsRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  ItemsTopicsRelations,
};

function init(sequelizeDb) {
  ItemsTopicsRelations.init(
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
      modelName: "ItemsTopicsRelations", // We need to choose the model name,
      underscored: true,
    }
  );

  if (ItemsTopicsRelations === sequelizeDb.models.ItemsTopicsRelations) {
    return [null];
  } else {
    return ["Can't init ItemsTopicsRelations model"];
  }
}

function initRelation({ Items, Topics }) {
  ItemsTopicsRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
      name: "item_id",
    },
  });
  ItemsTopicsRelations.belongsTo(Topics, {
    foreignKey: {
      allowNull: false,
      name: "topic_id",
    },
  });
}
