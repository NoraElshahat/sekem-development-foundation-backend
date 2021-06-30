const express = require("express");
const router = express();
const {
  addMediaCenter,
  mediaCenters,
  findeOneMefiaCenter,
  updateMediaCenter,
} = require("../controllers/mediaCenterController");
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

router.post("/add-media-center", upload.single("img"), addMediaCenter);
router.get("/media-centers", mediaCenters);
router.get("/media-center/:id", findeOneMefiaCenter);
router.patch("/one-media-center/:id", updateMediaCenter);

module.exports = router;
