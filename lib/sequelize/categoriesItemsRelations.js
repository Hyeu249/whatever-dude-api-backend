const { DataTypes, Model } = require("sequelize");

class CategoriesItemsRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  CategoriesItemsRelations,
};

function init(sequelizeDb) {
  CategoriesItemsRelations.init(
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
      modelName: "CategoriesItemsRelations", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (CategoriesItemsRelations === sequelizeDb.models.CategoriesItemsRelations) {
    return [null];
  } else {
    return ["Can't init CategoriesItemsRelations model"];
  }
}

function initRelation({ Categories, Items }) {
  CategoriesItemsRelations.belongsTo(Categories, {
    foreignKey: {
      allowNull: false,
    },
  });
  CategoriesItemsRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
    },
  });
}
