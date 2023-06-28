const dotenv = require("dotenv");
const moduleAlias = require("module-alias");

const config = {
  useModuleAlias() {
    moduleAlias.addAliases({
      "@server": __dirname + "/../",
    });
    return this;
  },
  useEnv() {
    dotenv.config();
    return this;
  },
};

module.exports = config;
