const Repo = require("./index");
const { Users } = require("@server/lib/sequelize/users");
const log = require("@server/lib/log");

class UserRepo extends Repo {
  constructor() {
    super();
    this.Users = Users;
  }

  async isEmailExist(tx, email) {
    log.repo("Start USER Repo isEmailExist");

    try {
      const count = await Users.count({ where: { email: email } }, { transaction: tx });

      log.repo("Finish USER Repo isEmailExist");
      return [count > 0, null];
    } catch (error) {
      log.error("Finish USER Repo isEmailExist with error", error);
      return [null, error];
    }
  }
}

module.exports = UserRepo;
