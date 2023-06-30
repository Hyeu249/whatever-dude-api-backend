const path = require("path");
const express = require("express");
const cors = require("cors");
const yargs = require("@server/lib/yargs");
const morgan = require("@server/lib/morgan");
const log = require("@server/lib/log");
const sequelize = require("@server/lib/sequelize");
const middleware = require("@server/lib/middleware");
const Http = require("../../../internal/delivery/http");

const version = require("./version");
version.use("1.0.0");

const app = {
  execute() {
    yargs
      .start()
      .command("serve", "Serve the app.", server)

      .option("host", yargs.persistentFlags().stringVar("Host of my app.", "localhost"))
      .option("listen-port", yargs.persistentFlags().stringVar("Host of my app.", "3000", "p"))
      .option("jwt-secret", yargs.persistentFlags().stringVar("JWT secret used to generate JWT token."))
      //
      .option("db-type", yargs.persistentFlags().stringVar("DB type. E.g. sqlite3"))
      .option("db-host", yargs.persistentFlags().stringVar("DB host. E.g. localhost"))
      .option("db-port", yargs.persistentFlags().stringVar("DB port. E.g. 3306"))
      .option("db-username", yargs.persistentFlags().stringVar("DB username. E.g. root"))
      .option("db-password", yargs.persistentFlags().stringVar("DB password. E.g. test"))
      .option("db-database", yargs.persistentFlags().stringVar("DB database. E.g. test_db"))
      .option("db-protocol", yargs.persistentFlags().stringVar("DB protocol. E.g. tcp", "tcp"))

      .option("debug", yargs.persistentFlags().boolVarP("Enable debug mode.", "d"))
      .parse();
  },
};

module.exports = app;

async function server({ argv }) {
  //declare
  const { dbType, dbUsername, dbPassword, dbDatabase, dbProtocol, dbHost, dbPort, debug, listenPort } = argv;

  try {
    if (debug) {
      log.setLevel(log.DebugLevel);
    }
    //start db
    var [sequelizeDb, err] = await sequelize.open(dbType, [dbUsername, dbPassword, dbProtocol, dbHost, dbPort, dbDatabase]);
    if (err !== null) {
      throw new Error(err);
    }

    // Run the auto migration tool.
    var err = sequelize.schema.create(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    // Create a new http server via express.
    const app = express();

    app.use("/upload", express.static(path.join(__dirname, "../../../upload")));
    app.use(express.json());
    app.use(cors());
    app.use(morgan.middleware());

    const http = new Http(sequelizeDb);
    app.use(http.attachUserServiceHTTPHandler());
    app.use(http.attachImageServiceHTTPHandler());
    app.use(http.attachCategoryServiceHTTPHandler());
    app.use(http.attachTopicServiceHTTPHandler());
    app.use(http.attachGenderServiceHTTPHandler());
    app.use(http.attachColorServiceHTTPHandler());
    app.use(http.attachReviewServiceHTTPHandler());
    app.use(http.attachOrderServiceHTTPHandler());
    app.use(...middleware);

    //start server
    app.listen(listenPort, () => {
      log.info("Server is up on port " + listenPort);
    });

    // const closeDb = await sequelizeDb.close();
  } catch (error) {
    log.error("crash the app:", error);
  }
}
