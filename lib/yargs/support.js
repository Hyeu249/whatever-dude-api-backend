function stringVar(describe, defaultValue, alias, demandOption = false) {
  return {
    alias: alias,
    demandOption: demandOption,
    default: defaultValue,
    describe: describe,
    type: "string",
  };
}

function intVar(describe, defaultValue, alias, demandOption = false) {
  return {
    alias: alias,
    demandOption: demandOption,
    default: defaultValue,
    describe: describe,
    type: "number",
  };
}
function boolVarP(describe, alias, defaultValue = false, demandOption = false) {
  return {
    alias: alias,
    demandOption: demandOption,
    default: defaultValue,
    describe: describe,
    type: "boolean",
  };
}

const support = {
  persistentFlags() {
    return {
      stringVar: stringVar,
      intVar: intVar,
      boolVarP: boolVarP,
    };
  },
};

module.exports = support;
