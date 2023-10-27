const router = require("express").Router();
const Course = require("../Models/Course");
const User = require("../Models/User");
const Class = require("../Models/Classes");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/classForm", upload.single("video"), async (req, res) => {
  const { courseId, name, description } = req.body;
  const videoData = req.file ? req.file.buffer : null;
  const videoContentType = req.file ? req.file.mimetype : null;

  if (!courseId || !name || !description || !videoData) {
    res.status(422).json({
      error: "ID do curso, nome da aula, descrição e vídeo são obrigatórios",
    });
    return;
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    const tagClass = course.classes.length + 1;

    const newClass = new Class({
      course: course._id,
      name,
      description,
      tagClass,
    });

    // Se houver vídeo, adicione-o aos dados da aula
    if (videoData && videoContentType) {
      newClass.video = { data: videoData, contentType: videoContentType };
    }

    await newClass.save();

    course.classes.push(newClass._id);
    await course.save();

    res
      .status(201)
      .json({ message: "Aula criada com sucesso e vinculada ao curso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

module.exports = router;
