const log = require("@server/lib/log");

class Repo {
  async CREATE(tx, entity, body) {
    log.repo("Start CREATE Entity at Repo");

    try {
      const _ = await entity.create(body, { transaction: tx });

      log.repo("Finish CREATE Entity at Repo");
      return null;
    } catch (error) {
      log.error("Finish CREATE Entity at Repo with error", error);
      return error;
    }
  }
  UPDATE() {}
  READ() {}
  DELETE() {}
  READ_BY_ID() {}
}

module.exports = Repo;
