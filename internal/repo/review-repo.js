const Repo = require("./index");
const { Reviews } = require("@server/lib/sequelize/reviews");
const { Items } = require("@server/lib/sequelize/items");
const { Users } = require("@server/lib/sequelize/users");

class ReviewRepo extends Repo {
  constructor() {
    super();
    this.Reviews = Reviews;
    this.Items = Items;
    this.Users = Users;
  }
}

module.exports = ReviewRepo;
