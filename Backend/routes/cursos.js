import express from "express";
import { addCurso, getCursos } from "../controllers/curso.js";

const router = express.Router()

router.get("/getCursos", getCursos);
router.post("/addCurso", addCurso);

export default router;