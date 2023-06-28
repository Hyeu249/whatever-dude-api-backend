const config = require("./config");
config.useModuleAlias().useEnv();

const app = require("@server/cmd/whatever-dude/app/root");

function main() {
  app.execute();
}

main();
