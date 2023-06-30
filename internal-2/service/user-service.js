const UserRepo = require("../repo/user-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal-2/domain");

class UserService extends UserRepo {
  constructor(db) {
    super();
    this.db = db;
  }
  async serviceRegister(body) {
    log.service("Start USER register Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      // Check if username already exist
      var [isEmailExist, err] = await this.isEmailExist(tx, body.email);
      if (err !== null) {
        throw new Error(err);
      }
      if (isEmailExist) {
        throw new Error(domain.errEmailAlreadyExist);
      }

      //insert new user
      err = await this.CREATE(tx, this.Users, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish USER register Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish USER register Service with error", error);
      return parseError;
    }
  }
}

module.exports = UserService;
