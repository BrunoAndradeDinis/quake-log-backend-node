import { GameModel, IGame } from "../models/Game";

export class GameService {
  static async createGame(
    gameData: Omit<IGame, "createdAt" | "updatedAt">
  ): Promise<IGame> {
    const game = new GameModel(gameData);
    return await game.save();
  }

  static async getAllGames(): Promise<IGame[]> {
    return await GameModel.find().sort({ gameId: 1 });
  }

  static async getGameById(gameId: string): Promise<IGame | null> {
    return await GameModel.findOne({ gameId });
  }

  static async createManyGames(
    games: Omit<IGame, "createdAt" | "updatedAt">[]
  ): Promise<IGame[]> {
    return await GameModel.insertMany(games);
  }

  static async deleteAllGames(): Promise<void> {
    await GameModel.deleteMany({});
  }
}
