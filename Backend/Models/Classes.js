const Course = require("./Course");
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  name: String,
  description: String,
  video: {
    data: Buffer, // Dados binários do vídeo
    contentType: String, // Tipo de conteúdo do vídeo (por exemplo, "video/mp4")
  },
  tagClass: Number,
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
