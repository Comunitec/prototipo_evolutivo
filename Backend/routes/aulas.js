import express from "express";
import { addAula, getAulas, updateAula, deleteTodasAulas } from "../controllers/aula.js";

const router = express.Router();

router.post("/addAula/:idCurso", addAula)
router.get("/getAulas/:idCurso", getAulas)
router.put('/updateAula/:idCurso/:numeroAula', updateAula)
router.delete('/deleteTodasAulas/:idCurso', deleteTodasAulas)

export default router;