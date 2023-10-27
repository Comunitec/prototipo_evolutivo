const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  tags: [String],
  image: {
    data: Buffer, // Para armazenar os dados da imagem
    contentType: String, // Para armazenar o tipo de conteúdo da imagem (por exemplo, "image/jpeg")
  },
  classes: [String],
  tagCourse: Number,
});

module.exports = Course;
