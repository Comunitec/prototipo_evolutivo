import express from "express";
import { finalizarQuestionario, getQuestionariosFinalizados } from "../controllers/alunocursoaula.js";

const router = express.Router();

router.post("/finalizarQuestionario", finalizarQuestionario);
router.get("/getQuestionariosFinalizados/:id", getQuestionariosFinalizados);

export default router;