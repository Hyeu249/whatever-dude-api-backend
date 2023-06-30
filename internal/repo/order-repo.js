const Repo = require("./index");
const { Orders } = require("@server/lib/sequelize/orders");
const { Users } = require("@server/lib/sequelize/users");

class OrderRepo extends Repo {
  constructor() {
    super();
    this.Orders = Orders;
    this.Users = Users;
  }
}

module.exports = OrderRepo;
