const types = require("@server/lib/types");

const domains = {
  msgItemCreateSuccess: "Create item successfully.",
  msgItemUpdateSuccess: "Update item successfully.",
  msgItemGetListSuccess: "Get list successfully.",
  msgItemDeleteSuccess: "Delete item successfully.",

  itemIsNotFound: "Item is not found.",
};

const itemCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
  price: {
    type: types.NUMBER,
    validate: [],
  },
};

const itemUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
  price: {
    type: types.NUMBER,
    validate: [],
  },
};

const itemListRequest = {
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
  price: {
    type: types.NUMBER,
    validate: [],
  },
};

const itemDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, itemCreateRequest, itemUpdateRequest, itemListRequest, itemDeleteRequest };
