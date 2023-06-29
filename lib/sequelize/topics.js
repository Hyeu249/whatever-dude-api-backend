const { DataTypes, Model } = require("sequelize");

class Topics extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  Topics,
};

function init(sequelizeDb) {
  Topics.init(
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
      modelName: "Topics", // We need to choose the model name,
      underscored: true,
      paranoid: true,
    }
  );

  if (Topics === sequelizeDb.models.Topics) {
    return [null];
  } else {
    return ["Can't init Topics model"];
  }
}

function initRelation({ Items, ItemsTopicsRelations }) {
  Topics.belongsToMany(Items, { through: ItemsTopicsRelations });
}
