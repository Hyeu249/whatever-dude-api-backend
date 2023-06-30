const CategoryService = require("../../service/category-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal-2/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class CategoryHandler extends CategoryService {
  constructor(db) {
    super(db);
  }
  getCategory() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.categoryListRequest).validateStruct().parse();
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
        var [categories, err] = await this.serviceGetCategory(body);
        if (err !== null) {
          switch (err) {
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgCategoryGetListSuccess, result: categories });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  createCategory() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.categoryCreateRequest).validateStruct().parse();
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
        var err = await this.serviceCreateCategory(body);
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgCategoryCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateCategory() {
    return async (req, res) => {
      try {
        const category_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.categoryUpdateRequest).validateStruct().parse();
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
        var err = await this.serviceUpdateCategory(body, category_id);
        if (err !== null) {
          switch (err) {
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgCategoryUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteCategory() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.categoryDeleteRequest).validateStruct().parse();
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
        var err = await this.serviceDeleteCategory(body.id);
        if (err !== null) {
          switch (err) {
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgCategoryDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = CategoryHandler;
