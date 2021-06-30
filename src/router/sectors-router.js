const express = require("express");
const router = express.Router();
const {
  addSector,
  allSectors,
  updateSector,
  oneSector,
} = require("../controllers/sectorsController");
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

//add new project
router.post("/add-sector", upload.single("img"), addSector);

//list projects
router.get("/all-sectors", allSectors);

//update on sector
router.patch("/update-sectors/:id", upload.single("img"), updateSector);

//find one sector
router.get("/sector/:id", oneSector);

module.exports = router;
