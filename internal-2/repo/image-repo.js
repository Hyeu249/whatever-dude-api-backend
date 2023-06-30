const Repo = require("./index");
const { Images } = require("@server/lib/sequelize/images");

class ImageRepo extends Repo {
  constructor() {
    super();
    this.Images = Images;
  }
}

module.exports = ImageRepo;
