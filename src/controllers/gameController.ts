import { Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController {
  static async getAllGames(req: Request, res: Response): Promise<void> {
    try {
      const games = await GameService.getAllGames();

      if (!games || games.length === 0) {
        res.status(404).json({ erro: "Nenhum jogo encontrado" });
        return;
      }

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
      console.error("Erro ao buscar jogos:", error);
      res.status(500).json({ erro: "Erro ao buscar jogos" });
    }
  }

  static async getGameById(req: Request, res: Response): Promise<void> {
    try {
      const { gameId } = req.params;
      if (!gameId) {
        res.status(400).json({ erro: "ID do jogo não fornecido" });
        return;
      }

      const formattedGameId = gameId.startsWith("game_")
        ? gameId
        : `game_${gameId}`;
      const game = await GameService.getGameById(formattedGameId);

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
      console.error("Erro ao buscar jogo específico:", error);
      res.status(500).json({ erro: "Erro ao buscar jogo específico" });
    }
  }
}
