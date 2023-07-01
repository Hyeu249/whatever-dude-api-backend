const ItemRepo = require("../repo/item-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class ItemService extends ItemRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateItem(body) {
    log.service("Start TOPIC CreateItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new item
      var err = await this.CREATE(tx, this.Items, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC CreateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish TOPIC CreateItem Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateItem(body, item_id) {
    log.service("Start TOPIC UpdateItem Service");
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

      //insert new item
      var err = await this.UPDATE(tx, this.Items, body, item_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC UpdateItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC UpdateItem Service with error", error);
      return parseError;
    }
  }

  async serviceGetItem(body) {
    log.service("Start TOPIC GetItem Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
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
      var [items, err] = await this.READ(tx, this.Items, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC GetItem Service");
      return [items, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC GetItem Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteItem(item_id) {
    log.service("Start TOPIC DeleteItem Service");
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
      log.service("Finish TOPIC DeleteItem Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC DeleteItem Service with error", error);
      return parseError;
    }
  }
}

module.exports = ItemService;
