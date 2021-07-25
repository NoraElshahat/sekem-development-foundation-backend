const mongoose = require("mongoose");
const PublicationSchema = new mongoose.Schema({
  img: { type: String },
  title: { type: String },
  doc: { type: String },
});

const Publications = mongoose.model("Publications", PublicationSchema);
module.exports = Publications;
