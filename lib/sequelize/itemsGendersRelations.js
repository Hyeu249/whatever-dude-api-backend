const { DataTypes, Model } = require("sequelize");

class ItemsGendersRelations extends Model {}

module.exports = {
  schema: {
    init: init,
  },
  relation: {
    init: initRelation,
  },
  ItemsGendersRelations,
};

function init(sequelizeDb) {
  ItemsGendersRelations.init(
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
      modelName: "ItemsGendersRelations", // We need to choose the model name,
      underscored: true,
    }
  );

  if (ItemsGendersRelations === sequelizeDb.models.ItemsGendersRelations) {
    return [null];
  } else {
    return ["Can't init ItemsGendersRelations model"];
  }
}

function initRelation({ Items, Genders }) {
  ItemsGendersRelations.belongsTo(Items, {
    foreignKey: {
      allowNull: false,
      name: "item_id",
    },
  });
  ItemsGendersRelations.belongsTo(Genders, {
    foreignKey: {
      allowNull: false,
      name: "gender_id",
    },
  });
}
