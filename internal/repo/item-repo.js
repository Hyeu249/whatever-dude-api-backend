const Repo = require("./index");
const { Items } = require("@server/lib/sequelize/items");
const { Topics } = require("@server/lib/sequelize/topics");
const { Genders } = require("@server/lib/sequelize/genders");
const { Colors } = require("@server/lib/sequelize/colors");
const { Images } = require("@server/lib/sequelize/images");

class ItemRepo extends Repo {
  constructor() {
    super();
    this.Items = Items;
    this.Topics = Topics;
    this.Genders = Genders;
    this.Colors = Colors;
    this.Images = Images;
  }
}

module.exports = ItemRepo;
