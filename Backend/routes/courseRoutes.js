const express = require("express");
const multer = require("multer");
const Course = require("../Models/Course");
const User = require("../Models/User");

const router = express.Router();

// Configuração do multer para fazer upload de imagens
const storage = multer.memoryStorage(); // Armazena a imagem na memória
const upload = multer({ storage: storage });

router.post("/courseForm", upload.single("image"), async (req, res) => {
  const { authorId, name, description, tags } = req.body;
  const imageData = req.file ? req.file.buffer : null; // Dados binários da imagem
  const contentType = req.file ? req.file.mimetype : null; // Tipo de conteúdo da imagem

  if (!authorId || !name || !description) {
    res.status(422).json({
      error: "ID do autor, nome do curso e descrição são obrigatórios",
    });
    return;
  }

  try {
    // Encontre o autor pelo ID
    const author = await User.findById(authorId);

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado" });
    }

    // Obtenha o número atual de cursos do autor
    const currentTagCurso = author.tagCourse || 0;

    // Crie o curso com o número de cursos atualizado
    const courseData = {
      author: authorId,
      name,
      description,
      tags,
      tagCourse: currentTagCurso + 1,
    };

    // Se houver uma imagem, adicione-a aos dados do curso
    if (imageData && contentType) {
      courseData.image = { data: imageData, contentType: contentType };
    }

    await Course.create(courseData);

    // Atualize o número de cursos do autor no modelo de usuário
    author.tagCourse = currentTagCurso + 1;
    await author.save();

    res.status(201).json({ message: "Curso criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
