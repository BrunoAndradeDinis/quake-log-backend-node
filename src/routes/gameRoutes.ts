import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router();

// Get all games
router.get("/games", GameController.getAllGames);

// Get game by ID
router.get("/games/:gameId", GameController.getGameById);

export default router;
