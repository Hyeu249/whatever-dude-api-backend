const repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

module.exports = {
  register: register,
};

async function register(db, body) {
  log.Service("Start USER register Service");
  const tx = await db.transaction();

  try {
    // Check if username already exist
    var [isEmailExist, err] = await repo.userRepo.isEmailExist(tx, body.user_name);
    if (err !== null) {
      throw new Error(err);
    }
    if (isEmailExist) {
      throw new Error(domain.errEmailAlreadyExist);
    }

    //insert new user
    err = await repo.userRepo.insertNewUser(tx, body);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish USER register Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.parseErrorMessage(error.message);

    log.Error("Finish USER register Service with error", error);
    return parseError;
  }
}
