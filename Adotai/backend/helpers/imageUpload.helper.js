const multer = require("multer");
const path = require("path");

/**
 *  DESTINATION TO STORE THE IMAGES 
 */
const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {

    let folder = "";

    if(req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);

  },
  filename: function(req, file, cb) {

    cb(null, Date.now() + path.extname(file.originalname))

  }
});