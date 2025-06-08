import { Router } from "express";
import { GameController } from "../controllers/gameController";

const router = Router();


router.get("/", GameController.getAllGames);

router.get("/:gameId", GameController.getGameById);

export default router;
