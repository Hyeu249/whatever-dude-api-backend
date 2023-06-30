const CategoryHandler = require("./category");
const UserHandler = require("./user");
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

  attachCategoryServiceHTTPHandler() {
    const handler = new CategoryHandler(this.db);
    const router = new express.Router();
    const g = "/categories";

    router.get(g + "", handler.getCategory());
    router.post(g + "", handler.createCategory());
    router.patch(g + "/:id", handler.updateCategory());
    router.delete(g + "/:id", handler.deleteCategory());
    return router;
  }
}

module.exports = Http;
