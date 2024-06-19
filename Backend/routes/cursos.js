import express from "express";
import {
  addCurso,
  getCursos,
  getImagemCurso,
  getCertificadoCurso,
  getCursoPorId,
  getCursosEmCriacao,
  getCursosAguardandoAprovacao,
  getCursosAprovados,
  getAvaliacaoMediaCurso,
  avaliarCurso,
  updateCurso,
  getEmblemaCurso,
  aprovarCurso,
  reprovarCurso,
  enviarParaAprovacao,
  inativarCurso,
  deleteCurso
} from "../controllers/curso.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "static/images/cursos";
    if (file.fieldname === "Certificado") {
      folder = "static/images/certificados";
    } else if (file.fieldname === "Emblema") {
      folder = "static/images/emblemas";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addCurso",
  upload.fields([
    { name: "Imagem", maxCount: 1 },
    { name: "Certificado", maxCount: 1 },
    { name: "Emblema", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("Handling /addCurso route");
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    next();
  },
  addCurso
);

router.post(
  "/updateCurso/:idCurso",
  upload.fields([
    { name: "Imagem", maxCount: 1 },
    { name: "Certificado", maxCount: 1 },
    { name: "Emblema", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("Handling /updateCurso route");
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    next();
  },
  updateCurso
);

router.put("/aprovarCurso/:idCurso", aprovarCurso);
router.put("/reprovarCurso/:idCurso", reprovarCurso);
router.put("/enviarParaAprovacao/:idCurso", enviarParaAprovacao);
router.put("/inativarCurso/:idCurso", inativarCurso);
router.put('/avaliarCurso/:idCurso/:idAluno/:nota', avaliarCurso);

//GETS
router.get("/getCursos", getCursos);
router.get("/getImagemCurso/:id", getImagemCurso);
router.get("/getCertificadoCurso/:id", getCertificadoCurso);
router.get("/getAvaliacaoMediaCurso/:id", getAvaliacaoMediaCurso);
router.get("/getEmblemaCurso/:id", getEmblemaCurso);
router.get("/getCursoPorId/:id", getCursoPorId);
router.get("/getCursosEmCriacao/:idAlunoCriador", getCursosEmCriacao);
router.get("/getCursosAguardandoAprovacao", getCursosAguardandoAprovacao);
router.get("/getCursosAprovados", getCursosAprovados);

//Delete
router.delete('/deleteCurso/:idCurso', deleteCurso)

export default router;
