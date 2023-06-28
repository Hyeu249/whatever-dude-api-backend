const yargs = require("@server/lib/yargs");

const version = {
  use(version) {
    yargs.version(version);
    return this;
  },
};
module.exports = version;
