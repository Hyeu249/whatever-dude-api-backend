const ItemRepo = require("../repo/item-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

const isArray = (value) => Array.isArray(value);

class ItemService extends ItemRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateItem(body) {
    log.service("Start ITEM serviceCreateItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      for (const category_id of body.category_ids || []) {
        var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, category_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isCategoryExist) {
          throw new Error(domain.categoryIsNotFound);
        }
      }
      for (const topic_id of body.topic_ids || []) {
        var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isTopicExist) {
          throw new Error(domain.topicIsNotFound);
        }
      }
      for (const gender_id of body.gender_ids || []) {
        var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isGenderExist) {
          throw new Error(domain.genderIsNotFound);
        }
      }

      for (const color_id of body.color_ids || []) {
        var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isColorExist) {
          throw new Error(domain.colorIsNotFound);
        }
      }
      for (const image_id of body.image_ids || []) {
        var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isImageExist) {
          throw new Error(domain.imageIsNotFound);
        }
      }

      for (const size_id of body.size_ids || []) {
        var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, size_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isSizeExist) {
          throw new Error(domain.sizeIsNotFound);
        }
      }

      //insert new item
      var [item_id, err] = await this.CREATE(tx, this.Items, body);
      if (err !== null) {
        throw new Error(err);
      }

      for (const category_id of body.category_ids || []) {
        var [_, err] = await this.CREATE(tx, this.CategoriesItemsRelations, { item_id, category_id });
        if (err !== null) {
          throw new Error(err);
        }
      }

      for (const topic_id of body.topic_ids || []) {
        var [_, err] = await this.CREATE(tx, this.ItemsTopicsRelations, { item_id, topic_id });
        if (err !== null) {
          throw new Error(err);
        }
      }
      for (const gender_id of body.gender_ids || []) {
        var [_, err] = await this.CREATE(tx, this.ItemsGendersRelations, { item_id, gender_id });
        if (err !== null) {
          throw new Error(err);
        }
      }

      for (const color_id of body.color_ids || []) {
        var [_, err] = await this.CREATE(tx, this.ItemsColorsRelations, { item_id, color_id });
        if (err !== null) {
          throw new Error(err);
        }
      }
      for (const image_id of body.image_ids || []) {
        var [_, err] = await this.CREATE(tx, this.ItemsImagesRelations, { item_id, image_id });
        if (err !== null) {
          throw new Error(err);
        }
      }

      for (const size_id of body.size_ids || []) {
        var [_, err] = await this.CREATE(tx, this.ItemsSizesRelations, { item_id, size_id });
        if (err !== null) {
          throw new Error(err);
        }
      }

      await tx.commit();
      log.service("Finish ITEM serviceCreateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish ITEM serviceCreateItem Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateItem(body, item_id) {
    log.service("Start ITEM serviceUpdateItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      for (const category_id of body.category_ids || []) {
        var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, category_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isCategoryExist) {
          throw new Error(domain.categoryIsNotFound);
        }
      }
      for (const topic_id of body.topic_ids || []) {
        var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isTopicExist) {
          throw new Error(domain.topicIsNotFound);
        }
      }
      for (const gender_id of body.gender_ids || []) {
        var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isGenderExist) {
          throw new Error(domain.genderIsNotFound);
        }
      }

      for (const color_id of body.color_ids || []) {
        var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isColorExist) {
          throw new Error(domain.colorIsNotFound);
        }
      }
      for (const image_id of body.image_ids || []) {
        var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isImageExist) {
          throw new Error(domain.imageIsNotFound);
        }
      }
      for (const size_id of body.size_ids || []) {
        var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, size_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isSizeExist) {
          throw new Error(domain.sizeIsNotFound);
        }
      }

      var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, item_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isItemExist) {
        throw new Error(domain.itemIsNotFound);
      }

      //insert new item
      var err = await this.UPDATE(tx, this.Items, body, item_id);
      if (err !== null) {
        throw new Error(err);
      }

      if (isArray(body.category_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.CategoriesItemsRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const category_id of body.category_ids) {
          var [_, err] = await this.CREATE(tx, this.CategoriesItemsRelations, { item_id, category_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      if (isArray(body.topic_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.ItemsTopicsRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const topic_id of body.topic_ids) {
          var [_, err] = await this.CREATE(tx, this.ItemsTopicsRelations, { item_id, topic_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      if (isArray(body.gender_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.ItemsGendersRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const gender_id of body.gender_ids) {
          var [_, err] = await this.CREATE(tx, this.ItemsGendersRelations, { item_id, gender_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      if (isArray(body.color_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.ItemsColorsRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const color_id of body.color_ids) {
          var [_, err] = await this.CREATE(tx, this.ItemsColorsRelations, { item_id, color_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      if (isArray(body.image_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.ItemsImagesRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const image_id of body.image_ids) {
          var [_, err] = await this.CREATE(tx, this.ItemsImagesRelations, { item_id, image_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      if (isArray(body.size_ids)) {
        var err = await this.DELETE_BY_WHERE(tx, this.ItemsSizesRelations, { item_id });
        if (err !== null) {
          throw new Error(err);
        }
        for (const size_id of body.size_ids) {
          var [_, err] = await this.CREATE(tx, this.ItemsSizesRelations, { item_id, size_id });
          if (err !== null) {
            throw new Error(err);
          }
        }
      }

      await tx.commit();
      log.service("Finish ITEM serviceUpdateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceUpdateItem Service with error", error);
      return parseError;
    }
  }

  async serviceGetItems(body) {
    log.service("Start ITEM serviceGetItems Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      for (const category_id of body.category_ids || []) {
        var [isCategoryExist, err] = await this.IS_ENTITY_EXIST(tx, this.Categories, category_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isCategoryExist) {
          throw new Error(domain.categoryIsNotFound);
        }
      }
      for (const topic_id of body.topic_ids || []) {
        var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isTopicExist) {
          throw new Error(domain.topicIsNotFound);
        }
      }
      for (const gender_id of body.gender_ids || []) {
        var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isGenderExist) {
          throw new Error(domain.genderIsNotFound);
        }
      }

      for (const color_id of body.color_ids || []) {
        var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isColorExist) {
          throw new Error(domain.colorIsNotFound);
        }
      }
      for (const image_id of body.image_ids || []) {
        var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isImageExist) {
          throw new Error(domain.imageIsNotFound);
        }
      }
      for (const size_id of body.size_ids || []) {
        var [isSizeExist, err] = await this.IS_ENTITY_EXIST(tx, this.Sizes, size_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isSizeExist) {
          throw new Error(domain.sizeIsNotFound);
        }
      }

      if (body.id !== undefined) {
        var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isItemExist) {
          throw new Error(domain.itemIsNotFound);
        }
      }

      //get items
      var [items, err] = await this.getItemsAndRelatedData(tx, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ITEM serviceGetItems Service");
      return [items, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceGetItems Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteItem(item_id) {
    log.service("Start ITEM serviceDeleteItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, item_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isItemExist) {
        throw new Error(domain.itemIsNotFound);
      }

      //detroy new item
      var err = await this.DELETE(tx, this.Items, item_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ITEM serviceDeleteItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceDeleteItem Service with error", error);
      return parseError;
    }
  }

  async serviceGetItemById(item_id) {
    log.service("Start ITEM serviceGetItemById Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, item_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isItemExist) {
        throw new Error(domain.itemIsNotFound);
      }

      //get items
      var [item, err] = await this.getItemByIdAndRelatedData(tx, item_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ITEM serviceGetItemById Service");
      return [item, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceGetItemById Service with error", error);
      return [null, parseError];
    }
  }

  async serviceGetMinMaxPrices() {
    log.service("Start ITEM serviceGetMinMaxPrices Service");

    try {
      //get priceRange
      var [minPrice, err] = await this.getMinPriceFromItem();
      if (err !== null) {
        throw new Error(err);
      }

      var [maxPrice, err] = await this.getMaxPriceFromItem();
      if (err !== null) {
        throw new Error(err);
      }

      const priceRange = [minPrice, maxPrice];

      log.service("Finish ITEM serviceGetMinMaxPrices Service");
      return [priceRange, null];
    } catch (error) {
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceGetMinMaxPrices Service with error", error);
      return [null, parseError];
    }
  }

  async serviceGetBestSeller() {
    log.service("Start ITEM serviceGetBestSeller Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //get items
      var [items, err] = await this.getBestSellerAndRelatedData(tx);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ITEM serviceGetBestSeller Service");
      return [items, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM serviceGetBestSeller Service with error", error);
      return [null, parseError];
    }
  }
}

module.exports = ItemService;
