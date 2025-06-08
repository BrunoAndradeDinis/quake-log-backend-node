import { Request, Response } from "express";
import { GameController } from "../../controllers/GameController";
import { GameService } from "../../services/GameService";
import "../setup/mongodb.setup";

jest.mock("../../services/GameService");

describe("GameController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any = {};

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

  beforeEach(() => {
    responseObject = {};
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGames", () => {
    it("should return all games formatted correctly", async () => {
      const mockGames = [mockGame, { ...mockGame, gameId: "game_2" }];

      (GameService.getAllGames as jest.Mock).mockResolvedValue(mockGames);

      await GameController.getAllGames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject).toEqual({
        game_1: {
          total_kills: 45,
          players: ["Dono da Bola", "Isgalamido", "Zeh"],
          kills: {
            "Dono da Bola": 5,
            Isgalamido: 18,
            Zeh: 20,
          },
        },
        game_2: {
          total_kills: 45,
          players: ["Dono da Bola", "Isgalamido", "Zeh"],
          kills: {
            "Dono da Bola": 5,
            Isgalamido: 18,
            Zeh: 20,
          },
        },
      });
    });

    it("should handle errors correctly", async () => {
      (GameService.getAllGames as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await GameController.getAllGames(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({ erro: "Erro ao buscar jogos" });
    });
  });

  describe("getGameById", () => {
    it("should return game by id formatted correctly", async () => {
      mockRequest = {
        params: { id: "1" },
      };

      (GameService.getGameById as jest.Mock).mockResolvedValue(mockGame);

      await GameController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject).toEqual({
        game_1: {
          total_kills: 45,
          players: ["Dono da Bola", "Isgalamido", "Zeh"],
          kills: {
            "Dono da Bola": 5,
            Isgalamido: 18,
            Zeh: 20,
          },
        },
      });
    });

    it("should handle non-existent game", async () => {
      mockRequest = {
        params: { id: "non_existent" },
      };

      (GameService.getGameById as jest.Mock).mockResolvedValue(null);

      await GameController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ erro: "Jogo não encontrado" });
    });

    it("should handle errors correctly", async () => {
      mockRequest = {
        params: { id: "1" },
      };

      (GameService.getGameById as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await GameController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({
        erro: "Erro ao buscar jogo específico",
      });
    });

    it("should handle game_id prefix correctly", async () => {
      mockRequest = {
        params: { id: "game_1" },
      };

      (GameService.getGameById as jest.Mock).mockResolvedValue(mockGame);

      await GameController.getGameById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(GameService.getGameById).toHaveBeenCalledWith("game_1");
    });
  });
});
