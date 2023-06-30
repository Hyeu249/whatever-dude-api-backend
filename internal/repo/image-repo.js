const Repo = require("./index");
const { Images } = require("@server/lib/sequelize/images");
const { Users } = require("@server/lib/sequelize/users");

class ImageRepo extends Repo {
  constructor() {
    super();
    this.Images = Images;
    this.Users = Users;
  }
}

module.exports = ImageRepo;
