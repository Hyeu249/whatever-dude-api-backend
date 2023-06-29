const { StatusCodes } = require("http-status-codes");
const admin = require("@server/firebase-config");

const domain = require("@server/internal/domain");

const { UNAUTHORIZED } = StatusCodes;

const ValidateUserAccessJWT = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    req.token = token;
    req.user_id = decodeValue.user_id;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).send({ error: domain.pleaseAuthenticate });
  }
};

module.exports = [ValidateUserAccessJWT];
