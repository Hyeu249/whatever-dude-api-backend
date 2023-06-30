const Repo = require("./index");
const { Orders } = require("@server/lib/sequelize/orders");

class OrderRepo extends Repo {
  constructor() {
    super();
    this.Orders = Orders;
  }
}

module.exports = OrderRepo;
