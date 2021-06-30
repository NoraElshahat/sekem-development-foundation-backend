const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const { handleError } = require("./src/helpers/error");
require("./src/db/mongoose");
const newsRouter = require("./src/router/news-router");
const projectsRouter = require("./src/router/projects-router");
const sectorsRouter = require("./src/router/sectors-router");
const programsRouter = require("./src/router/programs-router");
const mediaCenterRouter = require("./src/router/media-center");

app.use(cors());

// set up storage location using multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

//body parser to convert request body to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));

app.use(newsRouter);
app.use(sectorsRouter);
app.use(programsRouter);
app.use(projectsRouter);
app.use(mediaCenterRouter);

// middleware for central error handling
app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

// server listening
app.listen(port, "10.0.30.166", () => {
  console.log("Server is Ready");
});
