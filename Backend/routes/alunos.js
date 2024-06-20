import express from "express";
import { 
  addAluno, 
  deleteAluno, 
  getAlunos, 
  getImagemAluno, 
  getAlunosRanking, 
  authLogin, 
  rotaPrivada, 
  checkToken, 
  getAlunoPorId, 
  updateAluno, 
  getSenhaAtual, 
  atualizarSenha 
} from "../controllers/aluno.js";
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

router.get("/getAlunos", getAlunos);
router.post("/addAluno", upload.single('Foto'), addAluno);
router.get("/imagem/:id", getImagemAluno);
router.get("/ranking", getAlunosRanking);
router.delete('/deleteAluno/:id', deleteAluno);
router.post("/login", authLogin);
router.get("/user/:id", checkToken, rotaPrivada);
router.get('/getAlunoPorId/:id', getAlunoPorId);
router.put('/updateAluno/:id', upload.single('Foto'), updateAluno);  // Adicionado middleware de upload
router.get('/getSenhaAtual/:id', getSenhaAtual);
router.put('/atualizarSenha/:id', atualizarSenha);

export default router;
