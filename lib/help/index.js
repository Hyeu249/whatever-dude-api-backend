const domain = require("@server/internal/domain");

module.exports = { parseErrorMessage };
function parseErrorMessage(message) {
  if (typeof message !== "string") return domain.InternalErrorSplitMessage;
  const splitResult = message?.split("Error:");
  if (splitResult.length > 0) {
    return splitResult.find((v) => v.trim().length > 0).trim();
  } else {
    return message.trim();
  }
}
