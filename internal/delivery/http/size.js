const SizeService = require("../../service/size-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class SizeHandler extends SizeService {
  constructor(db) {
    super(db);
  }

  createSize() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.sizeCreateRequest).validateStruct().parse();
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
        var err = await this.serviceCreateSize(body);
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgSizeCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateSize() {
    return async (req, res) => {
      try {
        const size_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.sizeUpdateRequest).validateStruct().parse();
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
        var err = await this.serviceUpdateSize(body, size_id);
        if (err !== null) {
          switch (err) {
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgSizeUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getSize() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.sizeListRequest).validateStruct().parse();
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
        var [sizes, err] = await this.serviceGetSize(body);
        if (err !== null) {
          switch (err) {
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgSizeGetListSuccess, result: sizes });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteSize() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.sizeDeleteRequest).validateStruct().parse();
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
        var err = await this.serviceDeleteSize(body.id);
        if (err !== null) {
          switch (err) {
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgSizeDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = SizeHandler;
