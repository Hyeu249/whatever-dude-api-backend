const Repo = require("./index");
const { Reviews } = require("@server/lib/sequelize/reviews");

class ReviewRepo extends Repo {
  constructor() {
    super();
    this.Reviews = Reviews;
  }
}

module.exports = ReviewRepo;
