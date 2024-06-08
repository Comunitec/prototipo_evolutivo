import express from "express";
import { getTags, addTagCurso, getTagsPorCurso, deleteTags } from "../controllers/tag.js";

const router = express.Router();

router.get("/getTags", getTags);
router.post("/addTagCurso", addTagCurso)
router.get('/:idCurso/tags', getTagsPorCurso);

// Delete
router.delete("/deleteTags/:idCurso", deleteTags)
export default router;