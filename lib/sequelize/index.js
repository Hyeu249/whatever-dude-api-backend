const { Sequelize } = require("sequelize");

const users = require("./users");
const images = require("./images");
const categories = require("./categories");
const topics = require("./topics");
const genders = require("./genders");
const colors = require("./colors");
const reviews = require("./reviews");
const orders = require("./orders");
const items = require("./items");
const categoriesItemsRelations = require("./categoriesItemsRelations");
const itemsTopicsRelations = require("./itemsTopicsRelations");
const itemsGendersRelations = require("./itemsGendersRelations");
const itemsColorsRelations = require("./itemsColorsRelations");

module.exports = {
  open: openConnection,
  schema: {
    create: createSchema,
  },
};

const models = {
  Users: users.Users,
  Images: images.Images,
  Categories: categories.Categories,
  Topics: topics.Topics,
  Genders: genders.Genders,
  Colors: colors.Colors,
  Reviews: reviews.Reviews,
  Orders: orders.Orders,
  Items: items.Items,
  CategoriesItemsRelations: categoriesItemsRelations.CategoriesItemsRelations,
  ItemsTopicsRelations: itemsTopicsRelations.ItemsTopicsRelations,
  ItemsGendersRelations: itemsGendersRelations.ItemsGendersRelations,
  ItemsColorsRelations: itemsColorsRelations.ItemsColorsRelations,
};

async function openConnection(dbType, rest) {
  try {
    //yarn dev serve --db-type mysql --db-username "root" --db-password "test" --db-host "localhost" --db-port "3306" --db-database "test_db" --d

    const [username, password, protocol, host, port, database] = rest;

    const sequelizeDb = new Sequelize(database, username, password, {
      host: host,
      port: port,
      protocol: protocol || "tcp",
      dialect: dbType,
      logging: false,
    });
    await sequelizeDb.authenticate();
    return [sequelizeDb, null];
  } catch (error) {
    return [null, error];
  }
}

function createSchema(sequelizeDb) {
  try {
    var [err] = users.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = images.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = categories.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = topics.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = genders.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = colors.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = reviews.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = orders.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = items.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = categoriesItemsRelations.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = itemsTopicsRelations.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = itemsGendersRelations.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = itemsColorsRelations.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    users.relation.init(models); // paranoid
    images.relation.init(models); // paranoid
    categories.relation.init(models); // paranoid
    topics.relation.init(models); // paranoid
    genders.relation.init(models); // paranoid
    colors.relation.init(models); // paranoid
    reviews.relation.init(models); // paranoid
    orders.relation.init(models); // paranoid
    items.relation.init(models); // paranoid
    categoriesItemsRelations.relation.init(models); // paranoid
    itemsTopicsRelations.relation.init(models); // paranoid
    itemsGendersRelations.relation.init(models); // paranoid
    itemsColorsRelations.relation.init(models); // paranoid

    sequelizeDb.sync({ force: true });
    return null;
  } catch (error) {
    return error;
  }
}
