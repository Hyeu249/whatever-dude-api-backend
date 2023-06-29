const express = require("express");
const { StatusCodes } = require("http-status-codes");

const service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");
const multer = require("@server/lib/multer");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

// module.exports = router;
module.exports = { attachImageServiceHTTPHandler };

function attachImageServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/images";

  router.get(g + "", getImageList.bind({ db }));
  router.post(g + "", multer.storeImageToLocal(), createImage.bind({ db }));
  router.patch(g + "/:id", updateImage.bind({ db }));
  router.delete(g + "/:id", deleteImage.bind({ db }));

  return router;
}

async function createImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.bind(req.body, domain.imageUploadRequest).validateStruct().parse();
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
    var err = await service.imageService.createImage(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    }

    return res.status(OK).send({ message: domain.msgImageUploadSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
  }
}

async function getImageList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.bind(req.query, domain.imageListRequest).validateStruct().parse();
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
    var [images, err] = await service.imageService.getImageList(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.imageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    }

    return res.status(OK).send({ message: domain.msgImageDownloadSuccess, result: images });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
  }
}

async function updateImage(req, res) {
  const { db } = this;

  try {
    const image_id = req.params.id;

    //validate struct
    var [body, err] = validator.bind(req.body, domain.imageUpdateRequest).validateStruct().parse();
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
    var err = await service.imageService.updateImage(db, body, image_id);
    if (err !== null) {
      switch (err) {
        case domain.imageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    }

    return res.status(OK).send({ message: domain.msgImageUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
  }
}

async function deleteImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.bind(req.params, domain.imageDeleteRequest).validateStruct().parse();
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
    var err = await service.imageService.deleteImage(db, body.id);
    if (err !== null) {
      switch (err) {
        case domain.imageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.imageIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    }

    return res.status(OK).send({ message: domain.msgImageDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
  }
}
