import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
  static async getAllGames(req: Request, res: Response): Promise<void> {
    try {
      const games = await GameService.getAllGames();

      // Transformar o array em um objeto com o formato especificado
      const formattedGames = games.reduce(
        (acc, game) => {
          acc[game.gameId] = {
            total_kills: game.total_kills,
            players: game.players,
            kills: game.kills,
          };
          return acc;
        },
        {} as Record<string, any>
      );

      res.json(formattedGames);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar jogos" });
    }
  }

  static async getGameById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const gameId = id.startsWith("game_") ? id : `game_${id}`;

      const game = await GameService.getGameById(gameId);

      if (!game) {
        res.status(404).json({ erro: "Jogo não encontrado" });
        return;
      }

      const formattedResponse = {
        [game.gameId]: {
          total_kills: game.total_kills,
          players: game.players,
          kills: game.kills,
        },
      };

      res.json(formattedResponse);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar jogo específico" });
    }
  }
}
