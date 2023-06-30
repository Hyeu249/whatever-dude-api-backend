const TopicService = require("../../service/topic-service");
const { StatusCodes } = require("http-status-codes");
const domain = require("@server/internal/domain");
const validator = require("@server/lib/validator");

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

class TopicHandler extends TopicService {
  constructor(db) {
    super(db);
  }

  createTopic() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.body, domain.topicCreateRequest).validateStruct().parse();
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
        var err = await this.serviceCreateTopic(body);
        if (err !== null) {
          switch (err) {
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgTopicCreateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  updateTopic() {
    return async (req, res) => {
      try {
        const topic_id = req.params.id;

        //validate struct
        var [body, err] = validator.bind(req.body, domain.topicUpdateRequest).validateStruct().parse();
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
        var err = await this.serviceUpdateTopic(body, topic_id);
        if (err !== null) {
          switch (err) {
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgTopicUpdateSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  getTopic() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.query, domain.topicListRequest).validateStruct().parse();
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
        var [topics, err] = await this.serviceGetTopic(body);
        if (err !== null) {
          switch (err) {
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgTopicGetListSuccess, result: topics });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }

  deleteTopic() {
    return async (req, res) => {
      try {
        //validate struct
        var [body, err] = validator.bind(req.params, domain.topicDeleteRequest).validateStruct().parse();
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
        var err = await this.serviceDeleteTopic(body.id);
        if (err !== null) {
          switch (err) {
            case domain.topicIsNotFound:
              return res.status(NOT_FOUND).send({ message: domain.topicIsNotFound });
            default:
              return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
          }
        }

        return res.status(OK).send({ message: domain.msgTopicDeleteSuccess });
      } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({ message: domain.internalServerError });
      }
    };
  }
}

module.exports = TopicHandler;
