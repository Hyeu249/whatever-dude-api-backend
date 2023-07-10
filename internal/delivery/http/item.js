const ItemService = require("../../service/item-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class ItemHandler extends ItemService {
  constructor(db) {
    super(db);
  }

  createItem() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.itemCreateRequest).validateStruct().parse();
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
        var err = await this.serviceCreateItem(body);
        if (err !== null) {
          switch (err) {
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            case domain.genderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.genderIsNotFound });
            case domain.colorIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.colorIsNotFound });
            case domain.imageIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateItem() {
    return async (req, res) => {
      try {
        const item_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.itemUpdateRequest).validateStruct().parse();
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
        var err = await this.serviceUpdateItem(body, item_id);
        if (err !== null) {
          switch (err) {
            case domain.itemIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.itemIsNotFound });
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            case domain.genderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.genderIsNotFound });
            case domain.colorIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.colorIsNotFound });
            case domain.imageIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getItems() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.itemListRequest).validateStruct().parse();
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
        var [items, err] = await this.serviceGetItems(body);
        if (err !== null) {
          switch (err) {
            case domain.itemIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.itemIsNotFound });
            case domain.categoryIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.categoryIsNotFound });
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            case domain.genderIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.genderIsNotFound });
            case domain.colorIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.colorIsNotFound });
            case domain.imageIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
            case domain.sizeIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.sizeIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemGetListSuccess, result: items });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteItem() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.itemDeleteRequest).validateStruct().parse();
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
        var err = await this.serviceDeleteItem(body.id);
        if (err !== null) {
          switch (err) {
            case domain.itemIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.itemIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getItemById() {
    return async (req, res) => {
      try {
        const item_id = req.params.id;

        //service
        var [item, err] = await this.serviceGetItemById(item_id);
        if (err !== null) {
          switch (err) {
            case domain.itemIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.itemIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemGetSuccess, result: item });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getMinMaxPrices() {
    return async (req, res) => {
      try {
        //service
        var [priceRange, err] = await this.serviceGetMinMaxPrices();
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemGetMinMaxPriceSuccess, result: priceRange });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getBestSeller() {
    return async (req, res) => {
      try {
        //service
        var [items, err] = await this.serviceGetBestSeller();
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgItemBestSellerSuccess, result: items });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = ItemHandler;
