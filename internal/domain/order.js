const types = require("@server/lib/types");

const domains = {
  msgOrderCreateSuccess: "Create order successfully.",
  msgOrderUpdateSuccess: "Update order successfully.",
  msgOrderGetListSuccess: "Get list successfully.",
  msgOrderDeleteSuccess: "Delete order successfully.",

  orderIsNotFound: "Order is not found.",
};

const orderCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  phone: {
    type: types.STRING,
    validate: ["required"],
  },
  address: {
    type: types.STRING,
    validate: ["required"],
  },
  note: {
    type: types.STRING,
    validate: [],
  },
  order_details: {
    type: types.ARRAY,
    validate: ["required"],
  },
};

const orderUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  phone: {
    type: types.STRING,
    validate: [],
  },
  address: {
    type: types.STRING,
    validate: [],
  },
  note: {
    type: types.STRING,
    validate: [],
  },
};

const orderListRequest = {
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
  phone: {
    type: types.STRING,
    validate: [],
  },
  address: {
    type: types.STRING,
    validate: [],
  },
  note: {
    type: types.STRING,
    validate: [],
  },
  status: {
    type: types.STRING,
    validate: [],
  },
};

const orderDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, orderCreateRequest, orderUpdateRequest, orderListRequest, orderDeleteRequest };
