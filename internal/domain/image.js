const types = require("@server/lib/types");

const domains = {
  msgImageUploadSuccess: "Upload image successfully.",
  msgImageUpdateSuccess: "Update image successfully.",
  msgImageDownloadSuccess: "Download image successfully.",
  msgImageDeleteSuccess: "Delete image successfully.",

  imageIsNotFound: "Image is not found.",
};

const imageUploadRequest = {
  name: {
    type: types.STRING,
    validate: ["required"],
  },

  description: {
    type: types.STRING,
    validate: [],
  },
  extention: {
    type: types.STRING,
    validate: ["required"],
  },
  location: {
    type: types.STRING,
    validate: ["required"],
  },
};

const imageUpdateRequest = {
  name: {
    type: types.STRING,
    validate: [],
  },

  description: {
    type: types.STRING,
    validate: [],
  },
};

const imageListRequest = {
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

const imageDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, imageUploadRequest, imageUpdateRequest, imageListRequest, imageDeleteRequest };
