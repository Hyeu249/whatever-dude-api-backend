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
      const http = "http://";
      const file_extention = file.mimetype.split("/")[1];
      const filename = uuidv4() + "." + file_extention;
      //declare body
      req.body.file_extention = file_extention;
      req.body.location = http + req.headers.host + "/" + location + "/" + filename;

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

const multer = {
  storeImageToLocal() {
    return upload.single("image");
  },
};

module.exports = multer;
