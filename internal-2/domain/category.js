const types = require("@server/lib/types");

const domains = {
  msgCategoryCreateSuccess: "Create category successfully.",
  msgCategoryUpdateSuccess: "Update category successfully.",
  msgCategoryGetListSuccess: "Get list successfully.",
  msgCategoryDeleteSuccess: "Delete category successfully.",

  CategoryIsNotFound: "Category is not found.",
};

const categoryCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const categoryUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const categoryListRequest = {
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

const categoryDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, categoryCreateRequest, categoryUpdateRequest, categoryListRequest, categoryDeleteRequest };
