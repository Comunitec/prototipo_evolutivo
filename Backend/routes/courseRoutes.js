const router = require("express").Router();
const Course = require("../Models/Course");

router.get("/test", async (req, res) => {
  res.json({ message: "Oi Express!" });
});

router.post("/courseForm", async (req, res) => {
  const { authorId, name, description, tags, file } = req.body;

  if (!authorId || !name || !description) {
    res
      .status(422)
      .json({
        error: "ID do autor, nome do curso e descrição são obrigatórios",
      });
    return;
  }

  try {
    const course = {
      author: authorId, // Adicione o ID do autor ao curso
      name,
      description,
      tags,
      file,
    };

    await Course.create(course);
    res.status(201).json({ message: "Curso criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
