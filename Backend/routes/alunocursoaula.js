import express from "express";
import { finalizarQuestionario, getQuestionariosFinalizados, checkFinalizado, countAulasConcluidas } from "../controllers/alunocursoaula.js";

const router = express.Router();

router.post("/finalizarQuestionario", finalizarQuestionario);
router.get("/getQuestionariosFinalizados/:id", getQuestionariosFinalizados);

router.post("/checkFinalizado", checkFinalizado);
router.get("/countAulasConcluidas/:idAluno/:idCurso", countAulasConcluidas);

export default router;