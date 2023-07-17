const { v4: uuidv4 } = require("uuid");

const multer = require("multer");

const location = "upload";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    try {
      callback(null, location);
    } catch (error) {
      callback(error);
    }
  },
  filename: function (req, file, callback) {
    try {
      const http = "https://";
      const extention = file.mimetype.split("/")[1];
      const filename = uuidv4() + "." + extention;
      const HOST = "coolschool.store:8080" || req.headers.host;
      //declare body
      req.body.extention = extention;
      req.body.location = http + HOST + "/" + location + "/" + filename;

      //callback
      callback(null, filename);
    } catch (error) {
      callback(error);
    }
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  storeImageToLocal() {
    return upload.single("image");
  },
};
