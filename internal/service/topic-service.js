const TopicRepo = require("../repo/topic-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class TopicService extends TopicRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateTopic(body) {
    log.service("Start TOPIC CreateTopic Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new topic
      var err = await this.CREATE(tx, this.Topics, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC CreateTopic Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish TOPIC CreateTopic Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateTopic(body, topic_id) {
    log.service("Start TOPIC UpdateTopic Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isTopicExist) {
        throw new Error(domain.topicIsNotFound);
      }

      //insert new topic
      var err = await this.UPDATE(tx, this.Topics, body, topic_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC UpdateTopic Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC UpdateTopic Service with error", error);
      return parseError;
    }
  }

  async serviceGetTopic(body) {
    log.service("Start TOPIC GetTopic Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isTopicExist) {
          throw new Error(domain.topicIsNotFound);
        }
      }

      //get topics
      var [topics, err] = await this.READ(tx, this.Topics, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC GetTopic Service");
      return [topics, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC GetTopic Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteTopic(topic_id) {
    log.service("Start TOPIC DeleteTopic Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isTopicExist, err] = await this.IS_ENTITY_EXIST(tx, this.Topics, topic_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isTopicExist) {
        throw new Error(domain.topicIsNotFound);
      }

      //detroy new topic
      var err = await this.DELETE(tx, this.Topics, topic_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish TOPIC DeleteTopic Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish TOPIC DeleteTopic Service with error", error);
      return parseError;
    }
  }
}

module.exports = TopicService;
