const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicatonController");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

router.post(
  "/add-publication",
  upload.array("file", 20),
  publicationController.addPublication
);
router.get("/publications", publicationController.publications);
router.get("/download/:id", publicationController.downloadFile);

module.exports = router;
