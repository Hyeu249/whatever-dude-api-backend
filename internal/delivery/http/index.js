const CategoryHandler = require("./category");
const UserHandler = require("./user");
const ImageHandler = require("./image");
const TopicHandler = require("./topic");
const GenderHandler = require("./gender");
const ColorHandler = require("./color");
const ReviewHandler = require("./review");
const OrderHandler = require("./order");
const multer = require("@server/lib/multer");
const express = require("express");

class Http {
  constructor(db) {
    this.db = db;
  }

  attachUserServiceHTTPHandler() {
    const handler = new UserHandler(this.db);
    const router = new express.Router();
    const g = "/users";

    router.post(g + "", handler.register());
    return router;
  }

  attachImageServiceHTTPHandler() {
    const handler = new ImageHandler(this.db);
    const router = new express.Router();
    const g = "/images";

    router.post(g + "", multer.storeImageToLocal(), handler.createImage());
    router.patch(g + "/:id", handler.updateImage());
    router.get(g + "", handler.getImage());
    router.delete(g + "/:id", handler.deleteImage());
    return router;
  }

  attachCategoryServiceHTTPHandler() {
    const handler = new CategoryHandler(this.db);
    const router = new express.Router();
    const g = "/categories";

    router.post(g + "", handler.createCategory());
    router.patch(g + "/:id", handler.updateCategory());
    router.get(g + "", handler.getCategory());
    router.delete(g + "/:id", handler.deleteCategory());
    return router;
  }

  attachTopicServiceHTTPHandler() {
    const handler = new TopicHandler(this.db);
    const router = new express.Router();
    const g = "/topics";

    router.post(g + "", handler.createTopic());
    router.patch(g + "/:id", handler.updateTopic());
    router.get(g + "", handler.getTopic());
    router.delete(g + "/:id", handler.deleteTopic());
    return router;
  }

  attachGenderServiceHTTPHandler() {
    const handler = new GenderHandler(this.db);
    const router = new express.Router();
    const g = "/genders";

    router.post(g + "", handler.createGender());
    router.patch(g + "/:id", handler.updateGender());
    router.get(g + "", handler.getGender());
    router.delete(g + "/:id", handler.deleteGender());
    return router;
  }

  attachColorServiceHTTPHandler() {
    const handler = new ColorHandler(this.db);
    const router = new express.Router();
    const g = "/colors";

    router.post(g + "", handler.createColor());
    router.patch(g + "/:id", handler.updateColor());
    router.get(g + "", handler.getColor());
    router.delete(g + "/:id", handler.deleteColor());
    return router;
  }

  attachReviewServiceHTTPHandler() {
    const handler = new ReviewHandler(this.db);
    const router = new express.Router();
    const g = "/reviews";

    router.post(g + "", handler.createReview());
    router.patch(g + "/:id", handler.updateReview());
    router.get(g + "", handler.getReview());
    router.delete(g + "/:id", handler.deleteReview());
    return router;
  }

  attachOrderServiceHTTPHandler() {
    const handler = new OrderHandler(this.db);
    const router = new express.Router();
    const g = "/orders";

    router.post(g + "", handler.createOrder());
    router.patch(g + "/:id", handler.updateOrder());
    router.get(g + "", handler.getOrder());
    router.delete(g + "/:id", handler.deleteOrder());
    return router;
  }
}

module.exports = Http;
