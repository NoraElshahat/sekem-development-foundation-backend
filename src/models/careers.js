const mongoose = require("mongoose");
const CareersSchema = new mongoose.Schema({
  type: {
    type: Array,
  },
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
});

const Careers = mongoose.model("Careers", CareersSchema);
module.exports = Careers;
