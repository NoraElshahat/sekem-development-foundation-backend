const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title title required"],
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  objective: {
    type: String,
  },
  trainingDetails: {
    type: String,
  },
  sustainability: {
    type: String,
  },
  pictures: [
    {
      type: String,
    },
  ],
});

const Projects = mongoose.model("Projects", ProjectsSchema);
module.exports = Projects;
