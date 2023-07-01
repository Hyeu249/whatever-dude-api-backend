const Repo = require("./index");
const log = require("@server/lib/log");
const { Items } = require("@server/lib/sequelize/items");
const { Topics } = require("@server/lib/sequelize/topics");
const { Genders } = require("@server/lib/sequelize/genders");
const { Colors } = require("@server/lib/sequelize/colors");
const { Images } = require("@server/lib/sequelize/images");

const { ItemsTopicsRelations } = require("@server/lib/sequelize/itemsTopicsRelations");
const { ItemsGendersRelations } = require("@server/lib/sequelize/itemsGendersRelations");
const { ItemsColorsRelations } = require("@server/lib/sequelize/itemsColorsRelations");
const { ItemsImagesRelations } = require("@server/lib/sequelize/itemsImagesRelations");

class ItemRepo extends Repo {
  constructor() {
    super();
    this.Items = Items;
    this.Topics = Topics;
    this.Genders = Genders;
    this.Colors = Colors;
    this.Images = Images;
    this.ItemsTopicsRelations = ItemsTopicsRelations;
    this.ItemsGendersRelations = ItemsGendersRelations;
    this.ItemsColorsRelations = ItemsColorsRelations;
    this.ItemsImagesRelations = ItemsImagesRelations;
  }

  async READ_ITEM_AND_RELATED(tx, body) {
    log.repo("Start ITEM Entity at Repo");
    let offset = 0;
    let limit = 20;

    const conditions = {};
    //exact condition
    if (body.offset !== undefined) offset = body.offset;
    if (body.limit !== undefined) limit = body.limit;

    for (const [key, value] of Object.entries(body)) {
      if (value === undefined) continue;
      conditions[key] = value;
    }

    try {
      const records = await entity.findAndCountAll(
        {
          where: conditions,
          offset: Number(offset),
          limit: Number(limit),
        },
        { transaction: tx }
      );

      log.repo("Finish ITEM Entity at Repo");
      return [records, null];
    } catch (error) {
      log.error("Finish ITEM Entity at Repo with error", error);
      return [null, error];
    }
  }
}

module.exports = ItemRepo;
