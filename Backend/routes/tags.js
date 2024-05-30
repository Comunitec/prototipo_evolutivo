import express from "express";
import { getTags, addTagCurso } from "../controllers/tag.js";

const router = express.Router();

router.get("/getTags", getTags);
router.post("/addTagCurso", addTagCurso)

export default router;