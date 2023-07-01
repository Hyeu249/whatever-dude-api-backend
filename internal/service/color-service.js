const ColorRepo = require("../repo/color-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class ColorService extends ColorRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateColor(body) {
    log.service("Start COLOR CreateColor Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new color
      var [id, err] = await this.CREATE(tx, this.Colors, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish COLOR CreateColor Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish COLOR CreateColor Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateColor(body, color_id) {
    log.service("Start COLOR UpdateColor Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isColorExist) {
        throw new Error(domain.colorIsNotFound);
      }

      //insert new color
      var err = await this.UPDATE(tx, this.Colors, body, color_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish COLOR UpdateColor Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish COLOR UpdateColor Service with error", error);
      return parseError;
    }
  }

  async serviceGetColor(body) {
    log.service("Start COLOR GetColor Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isColorExist) {
          throw new Error(domain.colorIsNotFound);
        }
      }

      //get colors
      var [colors, err] = await this.READ(tx, this.Colors, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish COLOR GetColor Service");
      return [colors, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish COLOR GetColor Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteColor(color_id) {
    log.service("Start COLOR DeleteColor Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isColorExist) {
        throw new Error(domain.colorIsNotFound);
      }

      //detroy new color
      var err = await this.DELETE(tx, this.Colors, color_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish COLOR DeleteColor Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish COLOR DeleteColor Service with error", error);
      return parseError;
    }
  }
}

module.exports = ColorService;
