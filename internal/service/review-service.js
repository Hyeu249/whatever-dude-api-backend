const ReviewRepo = require("../repo/review-repo");
const log = require("@server/lib/log");
const help = require("@server/lib/help");
const domain = require("@server/internal/domain");

class ReviewService extends ReviewRepo {
  constructor(db) {
    super();
    this.db = db;
  }

  async serviceCreateReview(body, user_id) {
    log.service("Start REVIEW CreateReview Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //insert new review
      var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, body.item_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isItemExist) {
        throw new Error(domain.itemIsNotFound);
      }

      body.user_id = user_id;
      var err = await this.CREATE(tx, this.Reviews, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish REVIEW CreateReview Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);
      log.error("Finish REVIEW CreateReview Service with error", error);
      return parseError;
    }
  }

  async serviceUpdateReview(body, review_id) {
    log.service("Start REVIEW UpdateReview Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      var [isReviewExist, err] = await this.IS_ENTITY_EXIST(tx, this.Reviews, review_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isReviewExist) {
        throw new Error(domain.reviewIsNotFound);
      }

      //insert new review
      var err = await this.UPDATE(tx, this.Reviews, body, review_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish REVIEW UpdateReview Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish REVIEW UpdateReview Service with error", error);
      return parseError;
    }
  }

  async serviceGetReview(body) {
    log.service("Start REVIEW GetReview Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      if (body.id !== undefined) {
        var [isReviewExist, err] = await this.IS_ENTITY_EXIST(tx, this.Reviews, body.id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isReviewExist) {
          throw new Error(domain.reviewIsNotFound);
        }
      }

      if (body.item_id !== undefined) {
        var [isItemExist, err] = await this.IS_ENTITY_EXIST(tx, this.Items, body.item_id);
        if (err !== null) {
          throw new Error(err);
        }
        if (!isItemExist) {
          throw new Error(domain.itemIsNotFound);
        }
      }

      //get reviews
      var [reviews, err] = await this.READ(tx, this.Reviews, body);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish REVIEW GetReview Service");
      return [reviews, null];
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish REVIEW GetReview Service with error", error);
      return [null, parseError];
    }
  }

  async serviceDeleteReview(review_id) {
    log.service("Start REVIEW DeleteReview Service");
    const db = this.db;
    const tx = await db.transaction();

    try {
      //check id
      var [isReviewExist, err] = await this.IS_ENTITY_EXIST(tx, this.Reviews, review_id);
      if (err !== null) {
        throw new Error(err);
      }
      if (!isReviewExist) {
        throw new Error(domain.reviewIsNotFound);
      }

      //detroy new review
      var err = await this.DELETE(tx, this.Reviews, review_id);
      if (err !== null) {
        throw new Error(err);
      }

      await tx.commit();
      log.service("Finish REVIEW DeleteReview Service");
      return null;
    } catch (error) {
      await tx.rollback();
      const parseError = help.parseErrorMessage(error.message);

      log.error("Finish REVIEW DeleteReview Service with error", error);
      return parseError;
    }
  }
}

module.exports = ReviewService;
