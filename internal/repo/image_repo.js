const Sequelize = require("@server/lib/sequelize");
const { Op } = require("sequelize");

const log = require("@server/lib/log");

module.exports = {
  insertNewImage,
  updateImage,
  getImageList,
  detroyImage,
  isImageExist,
};

async function insertNewImage(tx, body, user_id) {
  log.repo("Start IMAGE Repo insertNewImage");
  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        file_extention: body.file_extention,
        location: body.location,
        user_id: user_id,
      },
      { transaction: tx }
    );

    log.repo("Finish IMAGE Repo insertNewImage");
    return null;
  } catch (error) {
    log.error("Finish IMAGE Repo insertNewImage with error", error);
    return error;
  }
}

async function updateImage(tx, body, image_id) {
  log.repo("Start IMAGE Repo updateImage");
  try {
    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    const _ = await Sequelize.Image.update(data, { where: { id: image_id }, transaction: tx });

    log.repo("Finish IMAGE Repo updateImage");
    return null;
  } catch (error) {
    log.error("Finish IMAGE Repo updateImage with error", error);
    return error;
  }
}

async function getImageList(tx, body) {
  log.repo("Start IMAGE Repo getImageList");
  let offset = 0;
  let limit = 20;

  const conditions = {};
  //exact condition
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;
  //like condition
  if (body.name !== undefined) conditions.name = { [Op.like]: "%" + body.name + "%" };
  if (body.description !== undefined) conditions.description = { [Op.like]: "%" + body.description + "%" };

  try {
    const images = await Sequelize.Image.findAndCountAll(
      {
        where: conditions,
        offset: Number(offset),
        limit: Number(limit),
      },
      { transaction: tx }
    );

    log.repo("Finish IMAGE Repo getImageList");
    return [images, null];
  } catch (error) {
    log.error("Finish IMAGE Repo getImageList with error", error);
    return [null, error];
  }
}

async function detroyImage(tx, image_id) {
  log.repo("Start IMAGE Repo detroyImage");

  try {
    const _ = await Sequelize.Image.destroy(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.repo("Finish IMAGE Repo detroyImage");
    return null;
  } catch (error) {
    log.error("Finish IMAGE Repo detroyImage with error", error);
    return error;
  }
}

async function isImageExist(tx, image_id) {
  log.repo("Start IMAGE Repo isImageExist");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.repo("Finish IMAGE Repo isImageExist");
    return [count > 0, null];
  } catch (error) {
    log.error("Finish IMAGE Repo isImageExist with error", error);
    return [null, error];
  }
}
