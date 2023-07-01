const ImageRepo = require("../repo/image-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class ImageService extends ImageRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateImage(body, user_id) {
    log.service("Start IMAGE createImage Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new image
      if (user_id !== undefined) {
        var [isUserExist, err] = await this.IS_ENTITY_EXIST(tx, this.Users, user_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isUserExist) {
          throw new Error(domain.userIsNotFound);
        }
        body.user_id = user_id;
      }

      var [id, err] = await this.CREATE(tx, this.Images, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish IMAGE createImage Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish IMAGE createImage Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateImage(body, image_id) {
    log.service("Start IMAGE UpdateImage Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isImageExist) {
        throw new Error(domain.imageIsNotFound);
      }

      //insert new image
      var err = await this.UPDATE(tx, this.Images, body, image_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish IMAGE UpdateImage Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish IMAGE UpdateImage Service with error", error);
      return parseError;
    }
  }

  async serviceGetImage(body, user_id) {
    log.service("Start IMAGE GetImage Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isImageExist) {
          throw new Error(domain.imageIsNotFound);
        }
      }

      if (user_id !== undefined) {
        var [isUserExist, err] = await this.IS_ENTITY_EXIST(tx, this.Users, user_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isUserExist) {
          throw new Error(domain.userIsNotFound);
        }
        body.user_id = user_id;
      }

      //get images
      var [images, err] = await this.READ(tx, this.Images, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish IMAGE GetImage Service");
      return [images, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish IMAGE GetImage Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteImage(image_id) {
    log.service("Start IMAGE DeleteImage Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isImageExist) {
        throw new Error(domain.imageIsNotFound);
      }

      //detroy new image
      var err = await this.DELETE(tx, this.Images, image_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish IMAGE DeleteImage Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish IMAGE DeleteImage Service with error", error);
      return parseError;
    }
  }
}

module.exports = ImageService;
