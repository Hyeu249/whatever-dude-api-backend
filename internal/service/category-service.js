const CategoryRepo = require("../repo/category-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class CategoryService extends CategoryRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateCategory(body) {
    log.service("Start CATEGORY CreateCategory Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new category
      var err = await this.CREATE(tx, this.Categories, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish CATEGORY CreateCategory Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish CATEGORY CreateCategory Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateCategory(body, category_id) {
    log.service("Start CATEGORY UpdateCategory Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, category_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isCategoryExist) {
        throw new Error(domain.categoryIsNotFound);
      }

      //insert new category
      var err = await this.UPDATE(tx, this.Categories, body, category_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish CATEGORY UpdateCategory Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish CATEGORY UpdateCategory Service with error", error);
      return parseError;
    }
  }

  async serviceGetCategory(body) {
    log.service("Start CATEGORY GetCategory Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isCategoryExist) {
          throw new Error(domain.categoryIsNotFound);
        }
      }

      //get categories
      var [categories, err] = await this.READ(tx, this.Categories, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish CATEGORY GetCategory Service");
      return [categories, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish CATEGORY GetCategory Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteCategory(category_id) {
    log.service("Start CATEGORY DeleteCategory Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, category_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isCategoryExist) {
        throw new Error(domain.categoryIsNotFound);
      }

      //detroy new category
      var err = await this.DELETE(tx, this.Categories, category_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish CATEGORY DeleteCategory Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish CATEGORY DeleteCategory Service with error", error);
      return parseError;
    }
  }
}

module.exports = CategoryService;
