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
    return (req, res) => {
      res.send("get!!!");
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
    return (req, res) => {
      res.send("updated!!!");
    };
  }

  deleteCategory() {
    return (req, res) => {
      res.send("delete!!!");
    };
  }
}

module.exports = CategoryHandler;
