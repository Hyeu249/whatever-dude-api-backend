const path = require("path");
const express = require("express");
const cors = require("cors");
const yargs = require("@server/lib/yargs");
const morgan = require("@server/lib/morgan");
const log = require("@server/lib/log");

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
      .option("db-type", yargs.persistentFlags().stringVar("DB type. E.g. sqlite3"))
      .option("db-str", yargs.persistentFlags().stringVar("Connection string to the DB."))
      .option("debug", yargs.persistentFlags().boolVarP("Enable debug mode.", "d"))
      .parse();
  },
};

module.exports = app;

async function server({ argv }) {
  //declare
  const { dbType, dbStr, debug, listenPort } = argv;
  try {
    if (debug) {
      log.setLevel(log.DebugLevel);
    }
    // Create a new http server via express.
    const app = express();

    app.use("/upload", express.static(path.join(__dirname, "../../../upload")));
    app.use(express.json());
    app.use(cors());
    app.use(morgan.middleware());

    app.get("/", (req, res) => {
      res.send("Hello, Express!");
    });

    //start server
    app.listen(listenPort, () => {
      log.info("Server is up on port " + listenPort);
    });

    // const closeDb = await sequelizeDb.close();
  } catch (error) {
    log.error("error from the app:", error);
  }
}
