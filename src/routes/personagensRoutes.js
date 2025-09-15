import express from "express"
import { getAllToyStory, getToyStoryById, createToyStory, deleteToyStory, putToy } from "../controllers/personagensController.js";

const router = express.Router();

// Rotas para heróis
router.get("/", getAllToyStory);
router.get("/:id", getToyStoryById)
router.post("/", createToyStory);
router.delete("/:id", deleteToyStory);
router.put("/:id", putToy)

export default router;