const ReviewService = require("../../service/review-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class ReviewHandler extends ReviewService {
  constructor(db) {
    super(db);
  }

  createReview() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.reviewCreateRequest).validateStruct().parse();
        if (err !== null) {
          switch (err) {
            case domain.malformedJSONErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.malformedJSONErrResMsg });
            case domain.validationFailureErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalErorAtValidation });
          }
        }
        //service
        var err = await this.serviceCreateReview(body, req.user_id);
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgReviewCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateReview() {
    return async (req, res) => {
      try {
        const review_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.reviewUpdateRequest).validateStruct().parse();
        if (err !== null) {
          switch (err) {
            case domain.malformedJSONErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.malformedJSONErrResMsg });
            case domain.validationFailureErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalErorAtValidation });
          }
        }
        //service
        var err = await this.serviceUpdateReview(body, review_id);
        if (err !== null) {
          switch (err) {
            case domain.reviewIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.reviewIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgReviewUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getReview() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.reviewListRequest).validateStruct().parse();
        if (err !== null) {
          switch (err) {
            case domain.malformedJSONErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.malformedJSONErrResMsg });
            case domain.validationFailureErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalErorAtValidation });
          }
        }
        //service
        var [reviews, err] = await this.serviceGetReview(body);
        if (err !== null) {
          switch (err) {
            case domain.reviewIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.reviewIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgReviewGetListSuccess, result: reviews });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteReview() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.reviewDeleteRequest).validateStruct().parse();
        if (err !== null) {
          switch (err) {
            case domain.malformedJSONErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.malformedJSONErrResMsg });
            case domain.validationFailureErrResMsg:
              return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalErorAtValidation });
          }
        }
        //service
        var err = await this.serviceDeleteReview(body.id);
        if (err !== null) {
          switch (err) {
            case domain.reviewIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.reviewIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgReviewDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = ReviewHandler;
