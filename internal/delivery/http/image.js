const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Service = require("@server/internal/service");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");
const multer = require("@server/lib/multer");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

// module.exports = router;
module.exports = { AttachImageServiceHTTPHandler };

function AttachImageServiceHTTPHandler(db) {
  const router = new express.Router();

  const g = "/images";

  router.get(g + "", getImageList.bind({ db }));
  router.post(g + "/printing", multer.StoreImageToLocal(), createImage.bind({ db }));
  router.patch(g + "/:id", updateImage.bind({ db }));
  router.delete(g + "/:id", deleteImage.bind({ db }));

  return router;
}

async function createImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ImageUploadRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.ImageService.CreatePrintingImage(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUploadSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function getImageList(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.query, domain.ImageListRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var [images, err] = await Service.ImageService.GetImageList(db, body, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageDownloadSuccess, result: images });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function updateImage(req, res) {
  const { db } = this;

  try {
    const image_id = req.params.id;

    //validate struct
    var [body, err] = validator.Bind(req.body, domain.ImageUpdateRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.ImageService.UpdateImage(db, body, image_id, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisUserIsNotTheOwner:
          return res.status(BAD_REQUEST).send({ message: domain.ThisUserIsNotTheOwner });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageUpdateSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}

async function deleteImage(req, res) {
  const { db } = this;

  try {
    //validate struct
    var [body, err] = validator.Bind(req.params, domain.ImageDeleteRequest).ValidateStruct().Parse();
    if (err !== null) {
      switch (err) {
        case domain.MalformedJSONErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.MalformedJSONErrResMsg });
        case domain.validationFailureErrResMsg:
          return res.status(BAD_REQUEST).send({ message: domain.validationFailureErrResMsg });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalErorAtValidation });
      }
    }
    //service
    var err = await Service.ImageService.DeleteImage(db, body.id, req.user_id);
    if (err !== null) {
      switch (err) {
        case domain.ImageIsNotFound:
          return res.status(NOT_FOUND).send({ message: domain.ImageIsNotFound });
        case domain.ThisUserIsNotTheOwner:
          return res.status(BAD_REQUEST).send({ message: domain.ThisUserIsNotTheOwner });
        default:
          return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
      }
    }

    return res.status(OK).send({ message: domain.MsgImageDeleteSuccess });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.InternalServerError });
  }
}
