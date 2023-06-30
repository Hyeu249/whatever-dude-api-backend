const Repo = require("./index");
const { Colors } = require("@server/lib/sequelize/colors");

class ColorRepo extends Repo {
  constructor() {
    super();
    this.Colors = Colors;
  }
}

module.exports = ColorRepo;
