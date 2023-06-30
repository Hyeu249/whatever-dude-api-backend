const CategoryHandler = require("./category");
const express = require("express");

class Http {
  constructor(db) {
    this.db = db;
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
