const types = require("@server/lib/types");

const domains = {
  msgGenderCreateSuccess: "Create gender successfully.",
  msgGenderUpdateSuccess: "Update gender successfully.",
  msgGenderGetListSuccess: "Get list successfully.",
  msgGenderDeleteSuccess: "Delete gender successfully.",

  genderIsNotFound: "Gender is not found.",
};

const genderCreateRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const genderUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },
  description: {
    type: types.STRING,
    validate: [],
  },
};

const genderListRequest = {
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

const genderDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, genderCreateRequest, genderUpdateRequest, genderListRequest, genderDeleteRequest };
