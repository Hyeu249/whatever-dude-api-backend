const Sequelize = require("@server/lib/sequelize");
const Image = require("@server/lib/sequelize/image");

const log = require("@server/lib/log");

class ImageRepo {
  constructor() {}
  static InsertNewPrintingImage = InsertNewPrintingImage;
  static InsertNewSampleImage = InsertNewSampleImage;
  static UpdateImage = UpdateImage;
  static GetImageList = GetImageList;
  static DetroyImage = DetroyImage;
  static IsImageExist = IsImageExist;
  static IsSampleImage = IsSampleImage;
  static IsPrintingImage = IsPrintingImage;
  static IsThisUserOwned = IsThisUserOwned;
}
module.exports = ImageRepo;

async function InsertNewPrintingImage(tx, body, user_id) {
  log.Repo("Start IMAGE Repo InsertNewPrintingImage");
  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        type: Image.Image_types.PRINTING,
        file_extention: body.file_extention,
        location: body.location,
        user_id: user_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo InsertNewPrintingImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewPrintingImage with error", error);
    return error;
  }
}

async function InsertNewSampleImage(tx, body, user_id) {
  log.Repo("Start IMAGE Repo InsertNewSampleImage");

  try {
    const _ = await Sequelize.Image.create(
      {
        name: body.name,
        description: body.description,
        type: Image.Image_types.SAMPLE,
        file_extention: body.file_extention,
        location: body.location,
        user_id: user_id,
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo InsertNewSampleImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo InsertNewSampleImage with error", error);
    return error;
  }
}

async function UpdateImage(tx, body, image_id) {
  log.Repo("Start IMAGE Repo UpdateImage");
  try {
    const data = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.description !== undefined) data.description = body.description;

    const _ = await Sequelize.Image.update(data, { where: { id: image_id }, transaction: tx });

    log.Repo("Finish IMAGE Repo UpdateImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo UpdateImage with error", error);
    return error;
  }
}

async function GetImageList(tx, body, user_id) {
  log.Repo("Start IMAGE Repo GetImageList");
  let offset = 0;
  let limit = 20;
  const { Op } = Sequelize;

  const conditions = { user_id };
  //exact condition
  if (body.offset !== undefined) offset = body.offset;
  if (body.limit !== undefined) limit = body.limit;
  if (body.image_id !== undefined) conditions.id = body.image_id;
  if (body.type !== undefined) conditions.type = body.type;
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

    log.Repo("Finish IMAGE Repo GetImageList");
    return [images, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo GetImageList with error", error);
    return [null, error];
  }
}

async function DetroyImage(tx, image_id) {
  log.Repo("Start IMAGE Repo DetroyImage");

  try {
    const _ = await Sequelize.Image.destroy(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo DetroyImage");
    return null;
  } catch (error) {
    log.Error("Finish IMAGE Repo DetroyImage with error", error);
    return error;
  }
}

async function IsImageExist(tx, image_id) {
  log.Repo("Start IMAGE Repo IsImageExist");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo IsImageExist");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo IsImageExist with error", error);
    return [null, error];
  }
}

async function IsSampleImage(tx, image_id) {
  log.Repo("Start IMAGE Repo IsSampleImage");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
          type: Image.Image_types.SAMPLE,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo IsSampleImage");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo IsSampleImage with error", error);
    return [null, error];
  }
}

async function IsPrintingImage(tx, image_id) {
  log.Repo("Start IMAGE Repo IsPrintingImage");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
          type: Image.Image_types.PRINTING,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo IsPrintingImage");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo IsPrintingImage with error", error);
    return [null, error];
  }
}

async function IsThisUserOwned(tx, image_id, user_id) {
  log.Repo("Start IMAGE Repo IsThisUserOwned");

  try {
    const count = await Sequelize.Image.count(
      {
        where: {
          id: image_id,
          user_id: user_id,
        },
      },
      { transaction: tx }
    );

    log.Repo("Finish IMAGE Repo IsThisUserOwned");
    return [count > 0, null];
  } catch (error) {
    log.Error("Finish IMAGE Repo IsThisUserOwned with error", error);
    return [null, error];
  }
}
