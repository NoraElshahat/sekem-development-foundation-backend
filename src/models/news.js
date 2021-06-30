const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  details: {
    type: String,
    required: [true, "Desciption is required"],
  },

  date: {
    type: String,
  },
  img: {
    type: String,
  },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
