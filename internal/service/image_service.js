const repo = require("@server/internal/repo");
const domain = require("@server/internal/domain");
const log = require("@server/lib/log");
const help = require("@server/lib/help");

module.exports = {
  createImage,
  updateImage,
  getImageList,
  deleteImage,
};

async function createImage(db, body, user_id) {
  log.Service("Start IMAGE createImage Service");
  const tx = await db.transaction();

  try {
    //insert new image
    const err = await repo.imageRepo.insertNewImage(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE createImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.parseErrorMessage(error.message);

    log.Error("Finish IMAGE createImage Service with error", error);
    return parseError;
  }
}

async function updateImage(db, body, image_id) {
  log.Service("Start IMAGE updateImage Service");
  const tx = await db.transaction();

  try {
    var [isImageExist, err] = await repo.imageRepo.isImageExist(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.imageIsNotFound);
    }

    //insert new image
    var err = await repo.imageRepo.updateImage(tx, body, image_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE updateImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.parseErrorMessage(error.message);

    log.Error("Finish IMAGE updateImage Service with error", error);
    return parseError;
  }
}

async function getImageList(db, body, user_id) {
  log.Service("Start IMAGE getImageList Service");
  const tx = await db.transaction();

  try {
    //get images
    var [images, err] = await repo.imageRepo.getImageList(tx, body, user_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE getImageList Service");
    return [images, null];
  } catch (error) {
    await tx.rollback();
    const parseError = help.parseErrorMessage(error.message);

    log.Error("Finish IMAGE getImageList Service with error", error);
    return [null, parseError];
  }
}

async function deleteImage(db, image_id, user_id) {
  log.Service("Start IMAGE deleteImage Service");
  const tx = await db.transaction();

  try {
    //check id
    var [isImageExist, err] = await repo.imageRepo.isImageExist(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }
    if (!isImageExist) {
      throw new Error(domain.imageIsNotFound);
    }

    //detroy new image
    var err = await repo.imageRepo.detroyImage(tx, image_id);
    if (err !== null) {
      throw new Error(err);
    }

    await tx.commit();
    log.Service("Finish IMAGE deleteImage Service");
    return null;
  } catch (error) {
    await tx.rollback();
    const parseError = help.parseErrorMessage(error.message);

    log.Error("Finish IMAGE deleteImage Service with error", error);
    return parseError;
  }
}
