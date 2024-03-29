const types = require("@server/lib/types");

const domains = {
  msgItemCreateSuccess: "Create item successfully.",
  msgItemUpdateSuccess: "Update item successfully.",
  msgItemGetListSuccess: "Get item list successfully.",
  msgItemDeleteSuccess: "Delete item item successfully.",
  msgItemGetSuccess: "Get item successfully.",

  msgItemGetMinMaxPriceSuccess: "Get min max price item successfully.",
  msgItemBestSellerSuccess: "Get items best seller successfully.",

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
    validate: ["required"],
  },
  sale: {
    type: types.NUMBER,
    validate: [],
  },
  category_ids: {
    type: types.ARRAY,
    validate: [],
  },
  topic_ids: {
    type: types.ARRAY,
    validate: [],
  },
  gender_ids: {
    type: types.ARRAY,
    validate: [],
  },
  color_ids: {
    type: types.ARRAY,
    validate: ["required"],
  },
  image_ids: {
    type: types.ARRAY,
    validate: ["required"],
  },
  size_ids: {
    type: types.ARRAY,
    validate: ["required"],
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
  sale: {
    type: types.NUMBER,
    validate: [],
  },
  category_ids: {
    type: types.ARRAY,
    validate: [],
  },
  topic_ids: {
    type: types.ARRAY,
    validate: [],
  },
  gender_ids: {
    type: types.ARRAY,
    validate: [],
  },
  color_ids: {
    type: types.ARRAY,
    validate: [],
  },
  image_ids: {
    type: types.ARRAY,
    validate: [],
  },
  size_ids: {
    type: types.ARRAY,
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
  price_start: {
    type: types.NUMBER,
    validate: [],
  },
  price_end: {
    type: types.NUMBER,
    validate: [],
  },
  sale: {
    type: types.NUMBER,
    validate: [],
  },
  getSale: {
    type: types.BOOLEAN,
    validate: [],
  },
  category_ids: {
    type: types.ARRAY,
    validate: [],
  },
  topic_ids: {
    type: types.ARRAY,
    validate: [],
  },
  gender_ids: {
    type: types.ARRAY,
    validate: [],
  },
  color_ids: {
    type: types.ARRAY,
    validate: [],
  },
  image_ids: {
    type: types.ARRAY,
    validate: [],
  },
  size_ids: {
    type: types.ARRAY,
    validate: [],
  },
};

const itemDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, itemCreateRequest, itemUpdateRequest, itemListRequest, itemDeleteRequest };
