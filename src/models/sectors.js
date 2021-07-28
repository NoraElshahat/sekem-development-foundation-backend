const mongoose = require("mongoose");
const SectorsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "sector title required"],
  },
  img: {
    type: String,
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Programs",
    },
  ],
});

const Sectors = mongoose.model("Sectors", SectorsSchema);
module.exports = Sectors;
