const Repo = require("./index");
const log = require("@server/lib/log");
const { Orders } = require("@server/lib/sequelize/orders");
const { Items } = require("@server/lib/sequelize/items");
const { Colors } = require("@server/lib/sequelize/colors");
const { Sizes } = require("@server/lib/sequelize/sizes");
const { Users } = require("@server/lib/sequelize/users");
const { OrdersAndRelatedInfos } = require("@server/lib/sequelize/ordersAndRelatedInfos");

class OrderRepo extends Repo {
  constructor() {
    super();
    this.Orders = Orders;
    this.Users = Users;
    this.OrdersAndRelatedInfos = OrdersAndRelatedInfos;
  }

  async getOrdersAndRelatedData(tx) {
    log.repo("Start ITEM getOrdersAndRelatedData at Repo");

    try {
      const records = await Orders.findAndCountAll(
        {
          distinct: true,
          attributes: ["id", "name", "phone", "address"],
          include: [
            {
              model: OrdersAndRelatedInfos,
              attributes: ["quantity"],
              include: [
                {
                  model: Items,
                  attributes: ["id", "name", "price"],
                },
                {
                  model: Colors,
                  attributes: ["name", "hex_code"],
                },
                { model: Sizes, attributes: ["name"] },
              ],
            },
          ],
        },
        { transaction: tx }
      );

      log.repo("Finish ITEM getOrdersAndRelatedData at Repo");
      return [records, null];
    } catch (error) {
      log.error("Finish ITEM getOrdersAndRelatedData at Repo with error", error);
      return [null, error];
    }
  }

  async getOrderByIdAndRelatedData(tx, order_id) {
    log.repo("Start ITEM getOrderByIdAndRelatedData at Repo");

    try {
      const record = await Orders.findAll(
        {
          distinct: true,
          include: [
            {
              model: OrdersAndRelatedInfos,
              attributes: ["quantity"],
              include: [
                {
                  model: Items,
                  attributes: ["id", "name", "price"],
                },
                {
                  model: Colors,
                  attributes: ["name", "hex_code"],
                },
                { model: Sizes, attributes: ["name"] },
              ],
            },
          ],
          where: { id: order_id },
        },
        { transaction: tx }
      );

      log.repo("Finish ITEM getOrderByIdAndRelatedData at Repo");
      return [record, null];
    } catch (error) {
      log.error("Finish ITEM getOrderByIdAndRelatedData at Repo with error", error);
      return [null, error];
    }
  }
}

module.exports = OrderRepo;
