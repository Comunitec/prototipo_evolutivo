const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  name: String,
  description: String,
  tags: [String],
});

module.exports = User;
