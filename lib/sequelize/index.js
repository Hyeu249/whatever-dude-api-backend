const { Sequelize, Op } = require("sequelize");

const user = require("./user");

const { ParseDbStr } = require("./support");

const sequelize = {
  open: openConnection,
  schema: {
    create: createSchema,
  },
  User: user.Model,
  Op: Op,
};
module.exports = sequelize;

const models = {
  User: user.Model,
};

async function openConnection(dbType, dbStr) {
  try {
    //require dbStr var formated like username:password@protocol(host:port)/database
    const { username, password, protocol, host, port, database } = ParseDbStr(dbStr);

    const sequelizeDb = new Sequelize(database, username, password, {
      host: host,
      port: port,
      protocol: protocol,
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
    var [err] = user.schema.Init(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    user.relation.Init(models); // paranoid

    sequelizeDb.sync({ force: false });
    return null;
  } catch (error) {
    return error;
  }
}
