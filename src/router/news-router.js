const express = require("express");
const router = express.Router();
const { addNews, getNews, getOne } = require("../controllers/newsController");
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

//add new news
router.post("/add-news", upload.single("img"), addNews);

//list news
router.get("/all-news", getNews);

//get one of news
router.get("/news/:id", getOne);

module.exports = router;
