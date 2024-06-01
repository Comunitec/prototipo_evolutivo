import express from "express";
import { getCursosMatriculados } from "../controllers/alunocurso.js";

const router = express.Router();

router.get("/getCursosMatriculados/:idAluno", getCursosMatriculados);

export default router;