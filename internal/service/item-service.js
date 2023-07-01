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
    log.service("Start ITEM CreateItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
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

      //insert new item
      var [item_id, err] = await this.CREATE(tx, this.Items, body);
      if (err !== null) {
        throw new Error(err);
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

      await tx.commit();
      log.service("Finish ITEM CreateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish ITEM CreateItem Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateItem(body, item_id) {
    log.service("Start ITEM UpdateItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
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

      await tx.commit();
      log.service("Finish ITEM UpdateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM UpdateItem Service with error", error);
      return parseError;
    }
  }

  async serviceGetItem(body) {
    log.service("Start ITEM GetItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.topic_id !== undefined) {
        var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isTopicExist) {
          throw new Error(domain.topicIsNotFound);
        }
      }

      if (body.gender_id !== undefined) {
        var [isGenderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Genders, gender_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isGenderExist) {
          throw new Error(domain.genderIsNotFound);
        }
      }

      if (body.color_id !== undefined) {
        var [isColorExist, err] = await this.IS_ENTITY_EXIST(tx, this.Colors, color_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isColorExist) {
          throw new Error(domain.colorIsNotFound);
        }
      }

      if (body.image_id !== undefined) {
        var [isImageExist, err] = await this.IS_ENTITY_EXIST(tx, this.Images, image_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isImageExist) {
          throw new Error(domain.imageIsNotFound);
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
      var [items, err] = await this.READ_ITEM_AND_RELATED(tx, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ITEM GetItem Service");
      return [items, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM GetItem Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteItem(item_id) {
    log.service("Start ITEM DeleteItem Service");
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
      log.service("Finish ITEM DeleteItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ITEM DeleteItem Service with error", error);
      return parseError;
    }
  }
}

module.exports = ItemService;
