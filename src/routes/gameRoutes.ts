import { Router, Request, Response } from "express";
import { GameController } from "../controllers/gameController";

const router = Router();

router.get("/games", async (req: Request, res: Response) => {
  await GameController.getAllGames(req, res);
});

router.get("/games/:id", async (req: Request, res: Response) => {
  await GameController.getGameById(req, res);
});

export default router;
