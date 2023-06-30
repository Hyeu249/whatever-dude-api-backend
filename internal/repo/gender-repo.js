const Repo = require("./index");
const { Genders } = require("@server/lib/sequelize/genders");

class GenderRepo extends Repo {
  constructor() {
    super();
    this.Genders = Genders;
  }
}

module.exports = GenderRepo;
