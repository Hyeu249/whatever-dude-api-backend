const CategoryRepo = require("../repo/category-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

class CategoryService extends CategoryRepo {
  constructor(db) {
    super();
    this.db = db;
  }
  async serviceCreateCategory(body) {
    log.service("Start COLLECTION CreateCategory Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new category
      var err = await this.CREATE(tx, this.Categories, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish COLLECTION CreateCategory Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish COLLECTION CreateCategory Service with error", error);
      return parseError;
    }
  }
}

module.exports = CategoryService;
