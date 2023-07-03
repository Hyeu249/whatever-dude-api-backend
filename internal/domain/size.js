const types = require("@server/lib/types");

const domains = {
  msgSizeCreateSuccess: "Create size successfully.",
  msgSizeUpdateSuccess: "Update size successfully.",
  msgSizeGetListSuccess: "Get size list successfully.",
  msgSizeDeleteSuccess: "Delete size successfully.",

  sizeIsNotFound: "Size is not found.",
};

const sizeCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const sizeUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const sizeListRequest = {
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

const sizeDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, sizeCreateRequest, sizeUpdateRequest, sizeListRequest, sizeDeleteRequest };
