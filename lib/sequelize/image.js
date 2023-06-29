const { DataTypes, Model } = require("sequelize");

class Image extends Model {}

const image = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Image,
};

module.exports = image;

function init(sequelizeDb) {
  Image.init(
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
      modelName: "Image", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Image === sequelizeDb.models.Image) {
    return [null];
  } else {
    return ["Can't init Image model"];
  }
}

function initRelation({}) {}
