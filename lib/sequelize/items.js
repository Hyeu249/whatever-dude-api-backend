const { DataTypes, Model } = require("sequelize");

class Items extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Items,
};

function init(sequelizeDb) {
  Items.init(
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sale: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          min: 0, // Minimum value
          max: 100, // Maximum value
        },
        defaultValue: 0,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Items", // We need to choose the model name,
      underscored: true,
    }
  );

  if (Items === sequelizeDb.models.Items) {
    return [null];
  } else {
    return ["Can't init Items model"];
  }
}

function initRelation(models) {
  Items.belongsToMany(models.Categories, {
    through: models.CategoriesItemsRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });

  Items.hasMany(models.OrdersAndRelatedInfos);

  Items.belongsToMany(models.Topics, {
    through: models.ItemsTopicsRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
  Items.belongsToMany(models.Genders, {
    through: models.ItemsGendersRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
  Items.belongsToMany(models.Colors, {
    through: models.ItemsColorsRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
  Items.belongsToMany(models.Images, {
    through: models.ItemsImagesRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
  Items.belongsToMany(models.Sizes, {
    through: models.ItemsSizesRelations,
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
  Items.hasMany(models.Reviews, {
    foreignKey: {
      name: "item_id",
      allowNull: false,
    },
  });
}
