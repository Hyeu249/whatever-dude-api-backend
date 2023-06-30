const OrderService = require("../../service/order-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class OrderHandler extends OrderService {
  constructor(db) {
    super(db);
  }

  createOrder() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.orderCreateRequest).validateStruct().parse();
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
        var err = await this.serviceCreateOrder(body, req.user_id);
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgOrderCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateOrder() {
    return async (req, res) => {
      try {
        const order_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.orderUpdateRequest).validateStruct().parse();
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
        var err = await this.serviceUpdateOrder(body, order_id);
        if (err !== null) {
          switch (err) {
            case domain.orderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.orderIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgOrderUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getOrder() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.orderListRequest).validateStruct().parse();
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
        var [orders, err] = await this.serviceGetOrder(body);
        if (err !== null) {
          switch (err) {
            case domain.orderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.orderIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgOrderGetListSuccess, result: orders });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteOrder() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.orderDeleteRequest).validateStruct().parse();
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
        var err = await this.serviceDeleteOrder(body.id);
        if (err !== null) {
          switch (err) {
            case domain.orderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.orderIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgOrderDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = OrderHandler;
