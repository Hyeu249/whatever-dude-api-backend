const { StatusCodes } = require("http-status-codes");
const admin = require("@server/firebase-config");

const domain = require("@server/internal/domain");

const { INTERNAL_SERVER_ERROR } = StatusCodes;

const validateUserAccessJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    req.token = token;
    req.user_id = decodeValue.user_id;
    next();
  } catch (error) {
    next();
  }
};

const queryParseINT = async (req, res, next) => {
  try {
    const keys = Object.keys(req.query);
    const intKeys = ["limit", "offset", "price_start", "price_end", "sale", "rating"];
    for (const field of keys) {
      if (!intKeys.includes(field)) continue;
      const [value, isNumber] = checkIsNumber(req.query[field]);
      if (isNumber) req.query[field] = value;
    }
    next();
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error: domain.internalServerError });
  }
};

function queryParseBool(req, res, next) {
  try {
    const keys = Object.keys(req.query);
    const boolKeys = ["getSale"];
    for (const field of keys) {
      if (!boolKeys.includes(field)) continue;
      const [value, isBool] = checkIsBool(req.query[field]);
      if (isBool) req.query[field] = value;
    }

    next();
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error: domain.internalServerError });
  }
}

module.exports = [validateUserAccessJWT, queryParseINT, queryParseBool];

function isNumber(value) {
  if (!isTypes(value, ["number", "string"])) return false;
  const converted = Number(value);
  return typeof converted === "number" && !isNaN(converted) && Number.isFinite(converted);
}

function isTypes(value, types) {
  if (types.includes(typeof value)) return true;
  return false;
}

function checkIsNumber(value) {
  if (!isNumber(value)) return [value, false];
  return [Number(value), true];
}

function isBoolean(value) {
  if (value === true || value === false) {
    return true;
  }

  if (value === "true" || value === "false") {
    return true;
  }

  return false;
}

function checkIsBool(value) {
  if (!isBoolean(value)) return [value, false];
  return [JSON.parse(value), true];
}
