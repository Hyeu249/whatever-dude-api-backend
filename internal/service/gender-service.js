const GenderRepo = require("../repo/gender-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class GenderService extends GenderRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateGender(body) {
    log.service("Start GENDER CreateGender Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new gender
      var [id, err] = await this.CREATE(tx, this.Genders, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish GENDER CreateGender Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish GENDER CreateGender Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateGender(body, gender_id) {
    log.service("Start GENDER UpdateGender Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isGenderExist) {
        throw new Error(domain.genderIsNotFound);
      }

      //insert new gender
      var err = await this.UPDATE(tx, this.Genders, body, gender_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish GENDER UpdateGender Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish GENDER UpdateGender Service with error", error);
      return parseError;
    }
  }

  async serviceGetGender(body) {
    log.service("Start GENDER GetGender Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isGenderExist) {
          throw new Error(domain.genderIsNotFound);
        }
      }

      //get genders
      var [genders, err] = await this.READ(tx, this.Genders, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish GENDER GetGender Service");
      return [genders, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish GENDER GetGender Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteGender(gender_id) {
    log.service("Start GENDER DeleteGender Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isGenderExist) {
        throw new Error(domain.genderIsNotFound);
      }

      //detroy new gender
      var err = await this.DELETE(tx, this.Genders, gender_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish GENDER DeleteGender Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish GENDER DeleteGender Service with error", error);
      return parseError;
    }
  }
}

module.exports = GenderService;
