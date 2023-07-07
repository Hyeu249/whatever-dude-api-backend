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
    log.repo("Start ORDER getOrdersAndRelatedData at Repo");

    try {
      const records = await Orders.findAndCountAll(
        {
          distinct: true,
          include: [
            {
              model: OrdersAndRelatedInfos,
              attributes: ["quantity"],
              include: [
                {
                  model: Items,
                  attributes: ["id", "name", "price", "sale"],
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

      log.repo("Finish ORDER getOrdersAndRelatedData at Repo");
      return [records, null];
    } catch (error) {
      log.error("Finish ORDER getOrdersAndRelatedData at Repo with error", error);
      return [null, error];
    }
  }
}

module.exports = OrderRepo;
