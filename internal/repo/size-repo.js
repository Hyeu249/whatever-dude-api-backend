const Repo = require("./index");
const { Sizes } = require("@server/lib/sequelize/sizes");

class SizeRepo extends Repo {
  constructor() {
    super();
    this.Sizes = Sizes;
  }
}

module.exports = SizeRepo;
