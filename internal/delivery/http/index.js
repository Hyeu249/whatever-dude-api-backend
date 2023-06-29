const user = require("./user");
const image = require("./image");

module.exports = {
  attachUserServiceHTTPHandler: user.attachUserServiceHTTPHandler,
  attachImageServiceHTTPHandler: image.attachImageServiceHTTPHandler,
};
