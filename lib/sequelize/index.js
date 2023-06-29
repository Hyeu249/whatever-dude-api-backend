const { Sequelize } = require("sequelize");
const user = require("./user");
const image = require("./image");

const sequelize = {
  open: openConnection,
  schema: {
    create: createSchema,
  },
};
module.exports = sequelize;

const models = {
  User: user.User,
  Image: image.Image,
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
    var [err] = user.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }
    var [err] = image.schema.init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    user.relation.init(models); // paranoid
    image.relation.init(models); // paranoid

    sequelizeDb.sync({ force: false });
    return null;
  } catch (error) {
    return error;
  }
}
