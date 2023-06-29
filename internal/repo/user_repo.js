const { User } = require("@server/lib/sequelize/users");
const log = require("@server/lib/log");

module.exports = {
  insertNewUser: insertNewUser,
  isEmailExist: isEmailExist,
};

async function insertNewUser(tx, body) {
  log.repo("Start USER Repo insertNewUser");
  try {
    const _ = await User.create(
      {
        id: body.id,
        email: body.email,
      },
      { transaction: tx }
    );

    log.repo("Finish USER Repo insertNewUser");
    return null;
  } catch (error) {
    log.error("Finish USER Repo insertNewUser with error", error);
    return error;
  }
}

async function isEmailExist(tx, email) {
  log.repo("Start USER Repo isEmailExist");

  try {
    const count = await User.count(
      {
        where: {
          email: email,
        },
      },
      { transaction: tx }
    );

    log.repo("Finish USER Repo isEmailExist");
    return [count > 0, null];
  } catch (error) {
    log.error("Finish USER Repo isEmailExist with error", error);
    return [null, error];
  }
}
