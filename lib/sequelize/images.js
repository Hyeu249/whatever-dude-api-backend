const { DataTypes, Model } = require("sequelize");

class Images extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Images,
};

function init(sequelizeDb) {
  Images.init(
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
      extention: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize: sequelizeDb, // We need to pass the connection instance
      modelName: "Images", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Images === sequelizeDb.models.Images) {
    return [null];
  } else {
    return ["Can't init Images model"];
  }
}

function initRelation({ Users, Items, ItemsImagesRelations }) {
  Images.belongsTo(Users);
  Images.belongsToMany(Items, {
    through: ItemsImagesRelations,
    foreignKey: {
      name: "image_id",
      allowNull: false,
    },
  });
}
