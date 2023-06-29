const dataTypes = require("@server/lib/dataTypes");

const Var = {
  MsgImageUploadSuccess: "Upload image successfully.",
  MsgImageUpdateSuccess: "Update image successfully.",
  MsgImageDownloadSuccess: "Download image successfully.",
  MsgImageDeleteSuccess: "Delete image successfully.",

  ImageLocationIsNotFound: "Image location is not found.",
  ImageIsNotFound: "Image is not found.",
  ThisIsNotSampleImage: "This is not sample image.",
  ThisIsNotPrintingImage: "This is not printing image.",
  ThisUserIsNotTheOwner: "This user is not the owner.",
};

const ImageUploadRequest = {
  name: {
    type: dataTypes.STRING,
    validate: ["required"],
  },

  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  file_extention: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
  location: {
    type: dataTypes.STRING,
    validate: ["required"],
  },
};

const ImageUpdateRequest = {
  name: {
    type: dataTypes.STRING,
    validate: [],
  },

  description: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ImageListRequest = {
  image_id: {
    type: dataTypes.STRING,
    validate: [],
  },
  offset: {
    type: dataTypes.STRING,
    validate: [],
  },
  limit: {
    type: dataTypes.STRING,
    validate: [],
  },
  name: {
    type: dataTypes.STRING,
    validate: [],
  },
  description: {
    type: dataTypes.STRING,
    validate: [],
  },
  type: {
    type: dataTypes.STRING,
    validate: [],
  },
};

const ImageDeleteRequest = {
  id: { type: dataTypes.STRING, validate: ["required"] },
};

module.exports = { ...Var, ImageUploadRequest, ImageUpdateRequest, ImageListRequest, ImageDeleteRequest };
