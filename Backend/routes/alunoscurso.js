import express from "express";
import { getCursosMatriculados, matricularAluno, desmatricularAluno, getIdAlunoCurso, verificarMatricula, finalizarCurso } from "../controllers/alunocurso.js";

const router = express.Router();

router.get("/getCursosMatriculados/:idAluno", getCursosMatriculados);

// Rota para registrar a matrícula de um aluno em um curso
router.post("/matricularAluno", matricularAluno);
router.delete("/desmatricularAluno", desmatricularAluno);

// Nova rota para obter o idAlunoCurso
router.get("/getIdAlunoCurso/:idAluno/:idCurso", getIdAlunoCurso);

// Rota para verificar a matrícula de um aluno em um curso
router.get("/verificarMatricula/:idAluno/:idCurso", verificarMatricula);

router.post("/finalizarCurso", finalizarCurso)


export default router;
