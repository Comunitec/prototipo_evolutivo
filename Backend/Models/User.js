const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  preferences: String,
  ranking: Number,
  points: Number,
});

module.exports = User;
