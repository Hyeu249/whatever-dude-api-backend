const Repo = require("./index");
const { Reviews } = require("@server/lib/sequelize/reviews");
const { Items } = require("@server/lib/sequelize/items");

class ReviewRepo extends Repo {
  constructor() {
    super();
    this.Reviews = Reviews;
    this.Items = Items;
  }
}

module.exports = ReviewRepo;
