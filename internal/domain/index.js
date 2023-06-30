const userDomains = require("./user");
const imageDomains = require("./image");
const categoryDomains = require("./category");
const topicDomains = require("./topic");
const genderDomains = require("./gender");
const colorDomains = require("./color");
const reviewDomains = require("./review");
const itemDomains = require("./item");
const orderDomains = require("./order");

const domains = {
  internalServerError: "Something bad happened in our server. Please contact the Administrator.",
  internalDataBaseError: "Database insert error.",
  pleaseAuthenticate: "Please authenticate.",
  //validate
  malformedJSONErrResMsg: "Payload is in wrong JSON format.",
  validationFailureErrResMsg: "Validation failed.",
  internalErorAtValidation: "Internal error at validation.",

  requiredFieldError: "Error! Missing Required Field.",
  gteValidationFailed: "Error! gte validation failed",
  payloadEmailInvalid: "Payload email invalid.",
  structTagFormatWithoutColon: "Struct tag format without colon.",
  structDontHaveFieldName: "Error! struct don't have field name.",
  gteStructMustHaveEqualSign: "Error! gte struct must have equal sign.",
  errorMessageIsNotString: "Error! message is not string.",
  internalErrorSplitMessage: "Internal error split message.",
  missingStructTags: "Missing Struct Tags.",
  gteStructMissingValue: "Gte struct missing value.",
};

module.exports = {
  ...domains,
  ...categoryDomains,
  ...userDomains,
  ...imageDomains,
  ...topicDomains,
  ...genderDomains,
  ...colorDomains,
  ...reviewDomains,
  ...itemDomains,
  ...orderDomains,
};
