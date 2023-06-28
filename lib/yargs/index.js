const _yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { persistentFlags } = require("./support");

const yargs = {
  start: function () {
    return _yargs(hideBin(process.argv));
  },

  version: function () {
    return _yargs.version;
  },

  persistentFlags,
};

module.exports = yargs;
