const mongoose = require("mongoose");

const MediaCenterModel = new mongoose.Schema({
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  href: {
    type: String,
  },
});

const MediaCenter = mongoose.model("MediaCenter", MediaCenterModel);

module.exports = MediaCenter;
