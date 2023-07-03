const SizeRepo = require("../repo/size-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class SizeService extends SizeRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateSize(body) {
    log.service("Start SIZE CreateSize Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new size
      var [id, err] = await this.CREATE(tx, this.Sizes, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish SIZE CreateSize Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish SIZE CreateSize Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateSize(body, size_id) {
    log.service("Start SIZE UpdateSize Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, size_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isSizeExist) {
        throw new Error(domain.sizeIsNotFound);
      }

      //insert new size
      var err = await this.UPDATE(tx, this.Sizes, body, size_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish SIZE UpdateSize Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish SIZE UpdateSize Service with error", error);
      return parseError;
    }
  }

  async serviceGetSize(body) {
    log.service("Start SIZE GetSize Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isSizeExist) {
          throw new Error(domain.sizeIsNotFound);
        }
      }

      //get sizes
      var [sizes, err] = await this.READ(tx, this.Sizes, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish SIZE GetSize Service");
      return [sizes, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish SIZE GetSize Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteSize(size_id) {
    log.service("Start SIZE DeleteSize Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, size_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isSizeExist) {
        throw new Error(domain.sizeIsNotFound);
      }

      //detroy new size
      var err = await this.DELETE(tx, this.Sizes, size_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish SIZE DeleteSize Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish SIZE DeleteSize Service with error", error);
      return parseError;
    }
  }
}

module.exports = SizeService;
