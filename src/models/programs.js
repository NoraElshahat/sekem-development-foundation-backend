const mongoose = require("mongoose");

const ProgramsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  details: {
    type: Array,
  },
});

const Programs = mongoose.model("Programs", ProgramsSchema);
module.exports = Programs;
