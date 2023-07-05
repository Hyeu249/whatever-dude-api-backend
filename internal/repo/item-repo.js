const { Op } = require("sequelize");
const Repo = require("./index");
const log = require("@server/lib/log");
const { Categories } = require("@server/lib/sequelize/categories");
const { Items } = require("@server/lib/sequelize/items");
const { Topics } = require("@server/lib/sequelize/topics");
const { Genders } = require("@server/lib/sequelize/genders");
const { Colors } = require("@server/lib/sequelize/colors");
const { Images } = require("@server/lib/sequelize/images");
const { Reviews } = require("@server/lib/sequelize/reviews");
const { Sizes } = require("@server/lib/sequelize/sizes");

const { CategoriesItemsRelations } = require("@server/lib/sequelize/categoriesItemsRelations");
const { ItemsTopicsRelations } = require("@server/lib/sequelize/itemsTopicsRelations");
const { ItemsGendersRelations } = require("@server/lib/sequelize/itemsGendersRelations");
const { ItemsColorsRelations } = require("@server/lib/sequelize/itemsColorsRelations");
const { ItemsImagesRelations } = require("@server/lib/sequelize/itemsImagesRelations");
const { ItemsSizesRelations } = require("@server/lib/sequelize/itemsSizesRelations");

const have = (value) => Array.isArray(value) && value.length > 0;

class ItemRepo extends Repo {
  constructor() {
    super();
    this.Items = Items;
    this.Categories = Categories;
    this.Topics = Topics;
    this.Genders = Genders;
    this.Colors = Colors;
    this.Images = Images;
    this.Sizes = Sizes;
    this.CategoriesItemsRelations = CategoriesItemsRelations;
    this.ItemsTopicsRelations = ItemsTopicsRelations;
    this.ItemsGendersRelations = ItemsGendersRelations;
    this.ItemsColorsRelations = ItemsColorsRelations;
    this.ItemsImagesRelations = ItemsImagesRelations;
    this.ItemsSizesRelations = ItemsSizesRelations;
  }

  async getItemsAndRelatedData(tx, body) {
    log.repo("Start ITEM getItemsAndRelatedData at Repo");
    let offset = 0;
    let limit = 20;

    const conditions = {};
    //exact condition
    if (body.offset !== undefined) offset = body.offset;
    if (body.limit !== undefined) limit = body.limit;

    if (body.id !== undefined) conditions.id = body.id;
    if (body.name !== undefined) conditions.name = body.name;
    if (body.description !== undefined) conditions.description = body.description;
    if (body.price !== undefined) conditions.price = body.price;
    if (body.price_end !== undefined && body.price_end !== undefined) {
      conditions.price = {
        [Op.gte]: body.price_start,
        [Op.lte]: body.price_end,
      };
    }

    const CATEGORY_CONDITIONS = { id: { [Op.in]: body.category_ids || [] } };
    const TOPIC_CONDITIONS = { id: { [Op.in]: body.topic_ids || [] } };
    const GENDER_CONDITIONS = { id: { [Op.in]: body.gender_ids || [] } };
    const COLOR_CONDITIONS = { id: { [Op.in]: body.color_ids || [] } };
    const IMAGE_CONDITIONS = { id: { [Op.in]: body.image_ids || [] } };
    const SIZE_CONDITIONS = { id: { [Op.in]: body.size_ids || [] } };

    try {
      const records = await Items.findAndCountAll(
        {
          distinct: true,
          include: [
            {
              model: Categories,
              attributes: [],
              where: have(body.category_ids) && CATEGORY_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Topics,
              attributes: [],
              where: have(body.topic_ids) && TOPIC_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Genders,
              attributes: [],
              where: have(body.gender_ids) && GENDER_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Colors,
              attributes: ["hex_code"],
              where: have(body.color_ids) && COLOR_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Images,
              attributes: ["location"],
              where: have(body.image_ids) && IMAGE_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Sizes,
              attributes: ["name"],
              where: have(body.size_ids) && SIZE_CONDITIONS,
              through: { attributes: [] },
            },
            {
              model: Reviews,
              attributes: ["review", "rating"],
            },
          ],
          where: conditions,
          offset: Number(offset),
          limit: Number(limit),
        },
        { transaction: tx }
      );

      log.repo("Finish ITEM getItemsAndRelatedData at Repo");
      return [records, null];
    } catch (error) {
      log.error("Finish ITEM getItemsAndRelatedData at Repo with error", error);
      return [null, error];
    }
  }

  async getItemByIdAndRelatedData(tx, item_id) {
    log.repo("Start ITEM getItemByIdAndRelatedData at Repo");

    try {
      const record = await Items.findAll(
        {
          distinct: true,
          include: [
            {
              model: Colors,
              attributes: ["hex_code"],
              through: { attributes: [] },
            },
            {
              model: Images,
              attributes: ["location"],
              through: { attributes: [] },
            },
            {
              model: Sizes,
              attributes: ["name"],
              through: { attributes: [] },
            },
            {
              model: Reviews,
              attributes: ["review", "rating"],
            },
          ],
          where: { id: item_id },
        },
        { transaction: tx }
      );

      log.repo("Finish ITEM getItemByIdAndRelatedData at Repo");
      return [record, null];
    } catch (error) {
      log.error("Finish ITEM getItemByIdAndRelatedData at Repo with error", error);
      return [null, error];
    }
  }

  async getMinPriceFromItem() {
    log.repo("Start ITEM getMinPriceFromItem at Repo");

    try {
      const minPrice = await Items.min("price");

      log.repo("Finish ITEM getMinPriceFromItem at Repo");
      return [minPrice, null];
    } catch (error) {
      log.error("Finish ITEM getMinPriceFromItem at Repo with error", error);
      return [null, error];
    }
  }

  async getMaxPriceFromItem() {
    log.repo("Start ITEM getMaxPriceFromItem at Repo");

    try {
      const maxPrice = await Items.max("price");

      log.repo("Finish ITEM getMaxPriceFromItem at Repo");
      return [maxPrice, null];
    } catch (error) {
      log.error("Finish ITEM getMaxPriceFromItem at Repo with error", error);
      return [null, error];
    }
  }
}

module.exports = ItemRepo;
