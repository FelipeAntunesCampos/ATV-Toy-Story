import express from "express"
import { getAllToyStory, getToyStoryById, createToyStory, deleteToyStory, putToy, getToyStoryByEstoque } from "../controllers/personagensController.js";

const router = express.Router();

// Rotas para personagens
router.get("/personagens", getAllToyStory);
router.get("/personagens/maisEstoque", getToyStoryByEstoque);
router.get("/personagens/:id", getToyStoryById);
router.post("/personagens", createToyStory);
router.delete("/personagens/:id", deleteToyStory);
router.put("/personagens/:id", putToy)

export default router;