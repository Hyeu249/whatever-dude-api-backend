const CategoryHandler = require("./category");
const UserHandler = require("./user");
const ImageHandler = require("./image");
const TopicHandler = require("./topic");
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
}

module.exports = Http;
