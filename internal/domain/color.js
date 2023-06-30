const types = require("@server/lib/types");

const domains = {
  msgColorCreateSuccess: "Create color successfully.",
  msgColorUpdateSuccess: "Update color successfully.",
  msgColorGetListSuccess: "Get list successfully.",
  msgColorDeleteSuccess: "Delete color successfully.",

  colorIsNotFound: "Color is not found.",
};

const colorCreateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  hex_code: {
    type: types.STRING,
    validate: ["required"],
  },
};

const colorUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  hex_code: {
    type: types.STRING,
    validate: [],
  },
};

const colorListRequest = {
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
  hex_code: {
    type: types.STRING,
    validate: [],
  },
};

const colorDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, colorCreateRequest, colorUpdateRequest, colorListRequest, colorDeleteRequest };
