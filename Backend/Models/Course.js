const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  tags: [String],
  image: String,
  classes: [String],
});

module.exports = Course;
