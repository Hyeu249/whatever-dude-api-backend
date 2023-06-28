const morgan = require("morgan");
const log = require("@server/lib/log");
const stream = {
  // Use the http severity
  write: (message) => log.http(message),
};

const skip = () => {
  return false;
};

const middleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  '[:method:url] HTTP/:http-version [status::status] ":user-agent"',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

module.exports = { middleware };
