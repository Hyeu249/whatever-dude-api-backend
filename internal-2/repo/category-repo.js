const Repo = require("./index");
const { Categories } = require("@server/lib/sequelize/categories");

class CategoryRepo extends Repo {
  constructor() {
    super();
    this.Categories = Categories;
  }
}

module.exports = CategoryRepo;
