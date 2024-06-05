import express from "express";
import { getQuestoes, addQuestao, getQuestoesByCursoEAula } from "../controllers/questao.js";

const router = express.Router();

router.get('/getQuestoes/:idCurso', getQuestoes)
router.post('/addQuestao/:idCurso', addQuestao)
router.get('/getQuestoesByCursoEAula/:idCurso/:numeroAula', getQuestoesByCursoEAula)

export default router;