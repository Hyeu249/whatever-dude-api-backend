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

  async getOrdersAndRelatedData(tx, body) {
    log.repo("Start ORDER getOrdersAndRelatedData at Repo");
    let offset = 1;
    let limit = 20;

    const conditions = {};
    //exact condition
    if (body.offset !== undefined) offset = body.offset;
    if (body.limit !== undefined) limit = body.limit;

    if (body.id !== undefined) conditions.id = body.id;
    if (body.name !== undefined) conditions.name = body.name;
    if (body.phone !== undefined) conditions.phone = body.phone;
    if (body.address !== undefined) conditions.address = body.address;
    if (body.note !== undefined) conditions.note = body.note;
    if (body.status !== undefined) conditions.status = body.status;

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
          where: conditions,
          offset: (offset - 1) * limit,
          limit: limit,
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

  async getPriceByItemID(tx, item_id) {
    log.repo("Start ORDER getPriceByItemID at Repo");

    try {
      const item = await Items.findOne(
        {
          attributes: ["price", "sale"],
          where: { id: item_id },
        },
        { transaction: tx }
      );

      log.repo("Finish ORDER getPriceByItemID at Repo");
      return [item, null];
    } catch (error) {
      log.error("Finish ORDER getPriceByItemID at Repo with error", error);
      return [null, error];
    }
  }
}

module.exports = OrderRepo;
