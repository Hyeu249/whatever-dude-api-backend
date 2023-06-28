const Winston = require("winston");

const { createLogger, format } = Winston;
const { combine, timestamp, json, splat, colorize, printf } = format;

const DebugLevel = "debug";
const disable = "disable";

const transports = {
  File: new Winston.transports.File({
    filename: "winston.log",
    format: combine(timestamp(), json(), splat()),
  }),
  Console: new Winston.transports.Console({
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), colorize(), customFormat()),
  }),
};

const logger = createLogger({
  levels: customLevels(),
});

// logger.add(transports.File);
logger.add(transports.Console);

transports.File.level = disable;
transports.Console.level = disable;

Winston.addColors({
  info: "bold greenBG",
  error: "bold redBG",
  service: "bold cyanBG",
  repo: "bold magentaBG",
  http: "bold yellowBG",
});

module.exports = { http, info, service, repo, error, debug, setLevel, DebugLevel };

function customFormat() {
  return printf(({ level, message, timestamp }) => {
    return `${level}: ${message} [${timestamp}]`;
  });
}

function setLevel(level) {
  for (const v of Object.values(transports)) {
    v.level = level;
  }
  return level;
}

function info(message, meta) {
  logger.info(message, meta);
}
function error(message, meta) {
  logger.error(message, meta);
}

function service(message, meta) {
  logger.service(message, meta);
}
function repo(message, meta) {
  logger.repo(message, meta);
}

function http(message, meta) {
  logger.http(message, meta);
}

function debug(message, meta) {
  logger.debug(message, meta);
}

function customLevels() {
  return {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    service: 4,
    repo: 5,
    debug: 6,
    silly: 7,
  };
}
