import express from "express";
import { getQuestionarios, addQuestionario } from "../controllers/questionario.js";

const router = express.Router();


router.get("/getQuestionarios/:idCurso", getQuestionarios)
router.post("/addQuestionario/:idCurso", addQuestionario)

export default router;