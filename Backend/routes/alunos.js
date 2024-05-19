import express from "express";
import { addAluno, getAlunos, getImagemAluno, getAlunosRanking } from "../controllers/aluno.js";
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images/alunos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/", getAlunos);
router.post("/addAluno", upload.single('Foto'), addAluno);
router.get("/imagem/:id", getImagemAluno);
router.get("/ranking", getAlunosRanking)


export default router;
