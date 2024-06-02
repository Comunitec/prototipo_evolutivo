import express from "express";
import { addAula, getAulas, updateAula } from "../controllers/aula.js";

const router = express.Router();

router.post("/addAula/:idCurso", addAula)
router.get("/getAulas/:idCurso", getAulas)
router.put('/updateAula/:idCurso/:numeroAula', updateAula)

export default router;