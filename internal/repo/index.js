const log = require("@server/lib/log");
const { cloneDeep } = require("lodash");

class Repo {
  async CREATE(tx, entity, body) {
    log.repo("Start CREATE Entity at Repo");

    try {
      const { id } = await entity.create(body, { transaction: tx });

      log.repo("Finish CREATE Entity at Repo");
      return [id, null];
    } catch (error) {
      log.error("Finish CREATE Entity at Repo with error", error);
      return [null, error];
    }
  }

  async BULK_CREATE(tx, entity, bodyArray) {
    log.repo("Start BULK_CREATE Entity at Repo");
    const NOT_ARRAY = !Array.isArray(bodyArray);
    if (NOT_ARRAY) throw new Error("bodyArray must be an array");

    try {
      const _ = await entity.bulkCreate(bodyArray, { transaction: tx });

      log.repo("Finish BULK_CREATE Entity at Repo");
      return null;
    } catch (error) {
      log.error("Finish BULK_CREATE Entity at Repo with error", error);
      return error;
    }
  }

  async UPDATE(tx, entity, body, id) {
    log.repo("Start UPDATE Entity at Repo");

    try {
      const data = {};
      for (const [key] of Object.entries(body)) {
        if (body[key] !== undefined) data[key] = body[key];
      }

      const _ = await entity.update(data, { where: { id }, transaction: tx });

      log.repo("Finish UPDATE Entity at Repo");
      return null;
    } catch (error) {
      log.error("Finish UPDATE Entity at Repo with error", error);
      return error;
    }
  }

  async READ(tx, entity, body) {
    log.repo("Start READ Entity at Repo");
    let offset = 0;
    let limit = 20;

    const conditions = {};
    //exact condition
    if (body.offset !== undefined) offset = body.offset;
    if (body.limit !== undefined) limit = body.limit;

    const newBody = removeFields(body, ["offset", "limit"]);

    for (const [key, value] of Object.entries(newBody)) {
      if (value === undefined) continue;
      conditions[key] = value;
    }

    try {
      const records = await entity.findAndCountAll(
        {
          where: conditions,
          offset: Number(offset),
          limit: Number(limit),
        },
        { transaction: tx }
      );

      log.repo("Finish READ Entity at Repo");
      return [records, null];
    } catch (error) {
      log.error("Finish READ Entity at Repo with error", error);
      return [null, error];
    }
  }

  async DELETE(tx, entity, id) {
    log.repo("Start DELETE Entity at Repo");

    try {
      const _ = await entity.destroy({ where: { id } }, { transaction: tx });

      log.repo("Finish DELETE Entity at Repo");
      return null;
    } catch (error) {
      log.error("Finish DELETE Entity at Repo with error", error);
      return error;
    }
  }

  async IS_ENTITY_EXIST(tx, entity, id) {
    log.repo("Start CHECK IS_ENTITY_EXIST at Repo");

    try {
      const count = await entity.count({ where: { id } }, { transaction: tx });

      log.repo("Finish CHECK IS_ENTITY_EXIST at Repo");
      return [count > 0, null];
    } catch (error) {
      log.error("Finish CHECK IS_ENTITY_EXIST at Repo with error", error);
      return [null, error];
    }
  }

  async DELETE_BY_WHERE(tx, entity, where) {
    log.repo("Start DELETE_BY_WHERE Entity at Repo");

    try {
      const _ = await entity.destroy({ where }, { transaction: tx });

      log.repo("Finish DELETE_BY_WHERE Entity at Repo");
      return null;
    } catch (error) {
      log.error("Finish DELETE_BY_WHERE Entity at Repo with error", error);
      return error;
    }
  }
  async READ_BY_ID() {}
}

module.exports = Repo;

function removeFields(body, fields = []) {
  const newBody = cloneDeep(body);
  for (const field of fields) {
    delete newBody[field];
  }
  return newBody;
}
