const { DataTypes, Model } = require("sequelize");

class ItemsImagesRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  ItemsImagesRelations,
};

function init(sequelizeDb) {
  ItemsImagesRelations.init(
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
      modelName: "ItemsImagesRelations", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (ItemsImagesRelations === sequelizeDb.models.ItemsImagesRelations) {
    return [null];
  } else {
    return ["Can't init ItemsImagesRelations model"];
  }
}

function initRelation({ Items, Images }) {
  ItemsImagesRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
      name: "item_id",
    },
  });
  ItemsImagesRelations.belongsTo(Images, {
    foreignKey: {
      allowNull: false,
      name: "image_id",
    },
  });
}
