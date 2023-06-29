const { DataTypes, Model } = require("sequelize");

class Categories extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Categories,
};

function init(sequelizeDb) {
  Categories.init(
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
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Categories", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Categories === sequelizeDb.models.Categories) {
    return [null];
  } else {
    return ["Can't init Categories model"];
  }
}

function initRelation({ Items, CategoriesItemsRelations }) {
  Categories.belongsToMany(Items, { through: CategoriesItemsRelations });
}
