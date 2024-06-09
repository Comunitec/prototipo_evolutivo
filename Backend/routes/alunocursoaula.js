import express from "express";
import { finalizarQuestionario } from "../controllers/alunocursoaula.js";

const router = express.Router();

router.post("/finalizarQuestionario", finalizarQuestionario);

export default router;