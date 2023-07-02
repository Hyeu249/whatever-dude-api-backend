const types = require("@server/lib/types");

const domains = {
  msgReviewCreateSuccess: "Create review successfully.",
  msgReviewUpdateSuccess: "Update review successfully.",
  msgReviewGetListSuccess: "Get list successfully.",
  msgReviewDeleteSuccess: "Delete review successfully.",

  reviewIsNotFound: "Review is not found.",
};

const reviewCreateRequest = {
  item_id: {
    type: types.STRING,
    validate: ["required"],
  },
  review: {
    type: types.STRING,
    validate: [],
  },
  rating: {
    type: types.NUMBER,
    validate: ["required"],
  },
};

const reviewUpdateRequest = {
  review: {
    type: types.STRING,
    validate: [],
  },
  rating: {
    type: types.NUMBER,
    validate: [],
  },
};

const reviewListRequest = {
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
  item_id: {
    type: types.STRING,
    validate: [],
  },
  review: {
    type: types.STRING,
    validate: [],
  },
  rating: {
    type: types.NUMBER,
    validate: [],
  },
};

const reviewDeleteRequest = {
  id: { type: types.STRING, validate: ["required"] },
};

module.exports = { ...domains, reviewCreateRequest, reviewUpdateRequest, reviewListRequest, reviewDeleteRequest };
