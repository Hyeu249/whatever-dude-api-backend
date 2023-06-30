const Repo = require("./index");
const { Topics } = require("@server/lib/sequelize/topics");

class TopicRepo extends Repo {
  constructor() {
    super();
    this.Topics = Topics;
  }
}

module.exports = TopicRepo;
