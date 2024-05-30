import express from "express";
import { getTags, addTagCurso, getTagsPorCurso } from "../controllers/tag.js";

const router = express.Router();

router.get("/getTags", getTags);
router.post("/addTagCurso", addTagCurso)
router.get('/:idCurso/tags', getTagsPorCurso);

export default router;