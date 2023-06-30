const types = require("@server/lib/types");

const domains = {
  msgTopicCreateSuccess: "Create topic successfully.",
  msgTopicUpdateSuccess: "Update topic successfully.",
  msgTopicGetListSuccess: "Get list successfully.",
  msgTopicDeleteSuccess: "Delete topic successfully.",

  topicIsNotFound: "Topic is not found.",
};

const topicCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const topicUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const topicListRequest = {
  id: {
    type: types.STRING,
    validate: [],
  },
  offset: {
    type: types.STRING,
    validate: [],
  },
  limit: {
    type: types.STRING,
    validate: [],
  },
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const topicDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, topicCreateRequest, topicUpdateRequest, topicListRequest, topicDeleteRequest };
