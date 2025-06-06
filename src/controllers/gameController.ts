import { Request, Response } from "express";
import { LogParser } from "../services/LogParser";
import path from "path";

export class GameController {
  private static logParser: LogParser = new LogParser();
  private static games: any = null;

  static async getAllGames(_req: Request, res: Response): Promise<Response> {
    try {
      if (!this.games) {
        const logPath = path.join(__dirname, "../games.log");
        this.games = await this.logParser.parseLogFile(logPath);
      }

      return res.json(this.games);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar dados dos jogos" });
    }
  }

  static async getGameById(req: Request, res: Response): Promise<Response> {
    try {
      if (!this.games) {
        const logPath = path.join(__dirname, "../games.log");
        this.games = await this.logParser.parseLogFile(logPath);
      }

      const gameId = req.params.id.startsWith("game_")
        ? req.params.id
        : `game_${req.params.id}`;

      const game = this.games[gameId];

      if (!game) {
        return res.status(404).json({
          error: "Jogo não encontrado",
          message: `Jogo com id '${gameId}' não encontrado`,
        });
      }

      return res.json({ [gameId]: game });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar dados do jogo" });
    }
  }
}
