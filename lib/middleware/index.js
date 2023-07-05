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
    const fields = Object.keys(req.query);
    const intFields = ["limit", "offset", "price_start", "price_end"];
    for (const field of fields) {
      if (!intFields.includes(field)) continue;
      const [value, isNumber] = checkIsNumber(req.query[field]);
      if (isNumber) req.query[field] = value;
    }
    next();
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({ error: domain.internalServerError });
  }
};

module.exports = [validateUserAccessJWT, queryParseINT];

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
