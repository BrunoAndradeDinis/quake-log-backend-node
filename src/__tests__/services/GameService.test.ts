import { GameService } from "../../services/GameService";
import { GameModel } from "../../models/Game";
import "../setup/mongodb.setup";

describe("GameService", () => {
  const mockGame = {
    gameId: "game_1",
    total_kills: 45,
    players: ["Dono da Bola", "Isgalamido", "Zeh"],
    kills: {
      "Dono da Bola": 5,
      Isgalamido: 18,
      Zeh: 20,
    },
  };

  beforeEach(async () => {
    await GameModel.deleteMany({});
  });

  describe("createGame", () => {
    it("should create a game successfully", async () => {
      const game = await GameService.createGame(mockGame);

      expect(game.gameId).toBe(mockGame.gameId);
      expect(game.total_kills).toBe(mockGame.total_kills);
      expect(game.players).toEqual(expect.arrayContaining(mockGame.players));
      expect(game.kills).toEqual(mockGame.kills);
    });

    it("should not allow duplicate gameId", async () => {
      await GameService.createGame(mockGame);

      await expect(GameService.createGame(mockGame)).rejects.toThrow();
    });
  });

  describe("getAllGames", () => {
    it("should return empty array when no games exist", async () => {
      const games = await GameService.getAllGames();
      expect(games).toHaveLength(0);
    });

    it("should return all games", async () => {
      await GameService.createGame(mockGame);
      await GameService.createGame({
        ...mockGame,
        gameId: "game_2",
      });

      const games = await GameService.getAllGames();
      expect(games).toHaveLength(2);
    });
  });

  describe("getGameById", () => {
    it("should return null for non-existent game", async () => {
      const game = await GameService.getGameById("non_existent");
      expect(game).toBeNull();
    });

    it("should return game by id", async () => {
      await GameService.createGame(mockGame);

      const game = await GameService.getGameById(mockGame.gameId);
      expect(game).toBeDefined();
      expect(game?.gameId).toBe(mockGame.gameId);
    });
  });

  describe("createManyGames", () => {
    it("should create multiple games", async () => {
      const games = [
        mockGame,
        { ...mockGame, gameId: "game_2" },
        { ...mockGame, gameId: "game_3" },
      ];

      const result = await GameService.createManyGames(games);
      expect(result).toHaveLength(3);

      const savedGames = await GameService.getAllGames();
      expect(savedGames).toHaveLength(3);
    });
  });

  describe("deleteAllGames", () => {
    it("should delete all games", async () => {
      await GameService.createGame(mockGame);
      await GameService.createGame({ ...mockGame, gameId: "game_2" });

      await GameService.deleteAllGames();

      const games = await GameService.getAllGames();
      expect(games).toHaveLength(0);
    });
  });
});
