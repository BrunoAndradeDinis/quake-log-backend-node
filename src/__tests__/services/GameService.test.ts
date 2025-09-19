import { GameService } from "../../services/GameService";
import { GameModel } from "../../models/Game";
import "../setup/mongodb.setup";

describe("Serviço de Jogo - GameService", () => {
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

  describe("criar jogo - createGame", () => {
    it("deve criar um jogo com sucesso", async () => {
      const game = await GameService.createGame(mockGame);

      expect(game.gameId).toBe(mockGame.gameId);
      expect(game.total_kills).toBe(mockGame.total_kills);
      expect(game.players).toEqual(expect.arrayContaining(mockGame.players));
      expect(game.kills).toEqual(mockGame.kills);
    });

    it("não deve permitir gameId duplicado", async () => {
      await GameService.createGame(mockGame);

      await expect(GameService.createGame(mockGame)).rejects.toThrow();
    });
  });

  describe("buscarTodosOsJogos - getAllGames", () => {
    it("deve retornar array vazio quando não existem jogos", async () => {
      const games = await GameService.getAllGames();
      expect(games).toHaveLength(0);
    });

    it("deve retornar todos os jogos", async () => {
      await GameService.createGame(mockGame);
      await GameService.createGame({
        ...mockGame,
        gameId: "game_2",
      });

      const games = await GameService.getAllGames();
      expect(games).toHaveLength(2);
    });
  });

  describe("buscarJogoPorId - getGameById", () => {
    it("deve retornar null para jogo inexistente", async () => {
      const game = await GameService.getGameById("non_existent");
      expect(game).toBeNull();
    });

    it("deve retornar jogo pelo id", async () => {
      await GameService.createGame(mockGame);

      const game = await GameService.getGameById(mockGame.gameId);
      expect(game).toBeDefined();
      expect(game?.gameId).toBe(mockGame.gameId);
    });
  });

  describe("criarVariosJogos - createManyGames", () => {
    it("deve criar múltiplos jogos", async () => {
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

  describe("deletar todos os jogos - deleteAllGames", () => {
    it("deve deletar todos os jogos", async () => {
      await GameService.createGame(mockGame);
      await GameService.createGame({ ...mockGame, gameId: "game_2" });

      await GameService.deleteAllGames();

      const games = await GameService.getAllGames();
      expect(games).toHaveLength(0);
    });
  });
});
