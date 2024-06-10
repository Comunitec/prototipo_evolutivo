import express from "express";
import { finalizarQuestionario, getQuestionariosFinalizados, checkFinalizado } from "../controllers/alunocursoaula.js";

const router = express.Router();

router.post("/finalizarQuestionario", finalizarQuestionario);
router.get("/getQuestionariosFinalizados/:id", getQuestionariosFinalizados);

router.post("/checkFinalizado", checkFinalizado);

export default router;