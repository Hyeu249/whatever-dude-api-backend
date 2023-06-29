const { Sequelize } = require("sequelize");

const users = require("./users");
const images = require("./images");
const categories = require("./categories");
const topics = require("./topics");
const genders = require("./genders");
const colors = require("./colors");

const sequelize = {
  open: openConnection,
  schema: {
    create: createSchema,
  },
};
module.exports = sequelize;

const models = {
  Users: users.Users,
  Images: images.Images,
  Categories: categories.Categories,
  Topics: topics.Topics,
  Genders: genders.Genders,
  Colors: colors.Colors,
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

    users.relation.init(models); // paranoid
    images.relation.init(models); // paranoid
    categories.relation.init(models); // paranoid
    topics.relation.init(models); // paranoid
    genders.relation.init(models); // paranoid
    colors.relation.init(models); // paranoid

    sequelizeDb.sync({ force: true });
    return null;
  } catch (error) {
    return error;
  }
}
