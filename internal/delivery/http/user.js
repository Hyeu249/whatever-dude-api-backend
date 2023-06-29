const express = require("express");
const { StatusCodes } = require("http-status-codes");

const service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

// module.exports = router;
module.exports = { attachUserServiceHTTPHandler };

function attachUserServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/users";

  router.post(g + "/register", register.bind({ db }));
  return router;
}

async function register(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.userRegisterRequest).ValidateStruct().Parse();
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
    var err = await service.userService.register(db, body);
    if (err !== null) {
      switch (err) {
        case domain.errEmailAlreadyExist:
          return res.status(BAD_REQUEST).send({ message: domain.errEmailAlreadyExist });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    }

    return res.status(OK).send({ message: domain.msgUserRegisterSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
  }
}
