const Repo = require("./index");
const { Orders } = require("@server/lib/sequelize/orders");
const { Users } = require("@server/lib/sequelize/users");
const { OrdersAndRelatedInfos } = require("@server/lib/sequelize/ordersAndRelatedInfos");

class OrderRepo extends Repo {
  constructor() {
    super();
    this.Orders = Orders;
    this.Users = Users;
    this.OrdersAndRelatedInfos = OrdersAndRelatedInfos;
  }
}

module.exports = OrderRepo;
