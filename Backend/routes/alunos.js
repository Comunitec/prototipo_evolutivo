import express from "express";
import { addAluno, getAlunos } from "../controllers/aluno.js";

const router = express.Router()

router.get("/", getAlunos)

router.post("/addAluno", addAluno)

export default router