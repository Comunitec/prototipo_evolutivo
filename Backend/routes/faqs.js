import express from "express";
import {addFaq, getFaq, deleteFaq } from "../controllers/faq.js";

const router = express.Router();

router.get("/getFaq", getFaq);

router.post("/addFaq", addFaq);
router.delete("/deleteFaq/:idFaq", deleteFaq);
export default router;