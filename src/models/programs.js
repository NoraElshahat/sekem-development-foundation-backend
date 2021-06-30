const mongoose = require("mongoose");

const ProgramsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "sector title required"],
  },
  img: {
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
  breif: {
    type: String,
  },
});

const Programs = mongoose.model("Programs", ProgramsSchema);
module.exports = Programs;
