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

      const orderBody = objectExcept(body, "order_details");
      const order_details = cloneDeep(body.order_details);
      let totalPrice = 0;

      for (const detail of order_details) {
        var [item, err] = await this.getPriceByItemID(tx, detail.item_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isNumber(detail.quantity) || detail.quantity < 1) throw new Error("Error quantity is less than 1");
        totalPrice += calcSalePrice(item.price, item.sale) * detail.quantity;
      }

      orderBody.total = totalPrice;

      var [order_id, err] = await this.CREATE(tx, this.Orders, orderBody);
      if (err !== null) {
        throw new Error(err);
      }

      for (const detail of order_details) {
        var [_, err] = await this.CREATE(tx, this.OrdersAndRelatedInfos, {
          order_id: order_id,
          item_id: detail.item_id,
          color_id: detail.color_id,
          size_id: detail.size_id,
          quantity: detail.quantity,
        });

        if (err !== null) {
          throw new Error(err);
        }
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
      var [orders, err] = await this.getOrdersAndRelatedData(tx, body);
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

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function calcSalePrice(price, discount) {
  if (!isNumber(discount)) return price;
  if (!discount) price;

  const salePrice = price - (price * discount) / 100;
  return salePrice;
}
