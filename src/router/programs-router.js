const express = require("express");
const router = express.Router();
const {
  addProgram,
  allPrograms,
  updateProgram,
  programProjects,
} = require("../controllers/programController");
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

//add new program
router.post("/add-program", upload.single("img"), addProgram);
//list programs
router.get("/all-programs", allPrograms);

router.patch("/update-program/:id", upload.single("img"), updateProgram);
//list projects of program
router.get("/projects-programs/:id", programProjects);

module.exports = router;
