const OrderRepo = require("../repo/order-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");
const { cloneDeep } = require("lodash");

class OrderService extends OrderRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateOrder(body, user_id) {
    log.service("Start ORDER CreateOrder Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new order
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

      const orderBody = objectExcept(body, "related_infos");
      var [order_id, err] = await this.CREATE(tx, this.Orders, orderBody);
      if (err !== null) {
        throw new Error(err);
      }

      const relatedInfosBody = body.related_infos.map((e) => ({ ...e, order_id }));
      var err = await this.BULK_CREATE(tx, this.OrdersAndRelatedInfos, relatedInfosBody);

      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ORDER CreateOrder Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish ORDER CreateOrder Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateOrder(body, order_id) {
    log.service("Start ORDER UpdateOrder Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isOrderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Orders, order_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isOrderExist) {
        throw new Error(domain.orderIsNotFound);
      }

      //insert new order
      var err = await this.UPDATE(tx, this.Orders, body, order_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ORDER UpdateOrder Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ORDER UpdateOrder Service with error", error);
      return parseError;
    }
  }

  async serviceGetOrder(body, user_id) {
    log.service("Start ORDER GetOrder Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isOrderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Orders, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isOrderExist) {
          throw new Error(domain.orderIsNotFound);
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

      //get orders
      var [orders, err] = await this.getOrdersAndRelatedData(tx, this.Orders, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ORDER GetOrder Service");
      return [orders, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ORDER GetOrder Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteOrder(order_id) {
    log.service("Start ORDER DeleteOrder Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isOrderExist, err] = await this.IS_ENTITY_EXIST(tx, this.Orders, order_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isOrderExist) {
        throw new Error(domain.orderIsNotFound);
      }

      //detroy new order
      var err = await this.DELETE(tx, this.Orders, order_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish ORDER DeleteOrder Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish ORDER DeleteOrder Service with error", error);
      return parseError;
    }
  }
}

module.exports = OrderService;

function objectExcept(obj, field = []) {
  const newObj = cloneDeep(obj);
  let fields;
  if (Array.isArray(field)) {
    fields = field;
  } else {
    fields = [field];
  }

  for (const field of fields) {
    if (newObj.hasOwnProperty(field)) {
      delete newObj[field];
    }
  }

  return newObj;
}
