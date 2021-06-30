const express = require("express");
const router = express.Router();
const {
  addProject,
  allProjects,
  updateProject,
  oneProject,
  findProjectsPictures,
} = require("../controllers/projectsController");
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
router.post("/add-project", upload.single("img"), addProject);
//list projects
router.get("/all-projects", allProjects);
//find one project
router.get("/project/:id", oneProject);
//update project
router.patch(
  "/updated-project/:id",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "pictures", maxCount: 10 },
  ]),
  updateProject
);
//find pics of projects
router.get("/project-pics/:id", findProjectsPictures);

module.exports = router;
