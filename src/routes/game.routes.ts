import { Router } from "express";
import { GameController } from "../controllers/gameController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - total_kills
 *         - players
 *         - kills
 *       properties:
 *         total_kills:
 *           type: integer
 *           description: Número total de mortes no jogo
 *         players:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de jogadores que participaram do jogo
 *         kills:
 *           type: object
 *           additionalProperties:
 *             type: integer
 *           description: Dicionário com o número de kills por jogador
 *       example:
 *         total_kills: 45
 *         players: ["Dono da Bola", "Isgalamido", "Zeh"]
 *         kills:
 *           "Dono da Bola": 5
 *           "Isgalamido": 18
 *           "Zeh": 20
 *   responses:
 *     ErroServidor:
 *       description: Erro interno do servidor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Erro ao processar a requisição"
 *     JogoNaoEncontrado:
 *       description: Jogo não encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Jogo não encontrado"
 */

/**
 * @swagger
 * /games:
 *   get:
 *     tags:
 *       - Jogos
 *     summary: Lista todos os jogos
 *     description: Retorna uma lista de todos os jogos processados do arquivo de log
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/Game'
 *             example:
 *               "game_1":
 *                 total_kills: 45
 *                 players: ["Dono da Bola", "Isgalamido", "Zeh"]
 *                 kills:
 *                   "Dono da Bola": 5
 *                   "Isgalamido": 18
 *                   "Zeh": 20
 *               "game_2":
 *                 total_kills: 12
 *                 players: ["Dono da Bola", "Isgalamido", "Zeh"]
 *                 kills:
 *                   "Dono da Bola": 2
 *                   "Isgalamido": 5
 *                   "Zeh": 4
 *       500:
 *         $ref: '#/components/responses/ErroServidor'
 */
router.get("/games", GameController.getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     tags:
 *       - Jogos
 *     summary: Retorna um jogo específico
 *     description: Busca e retorna os detalhes de um jogo específico pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do jogo (pode ser com ou sem o prefixo 'game_')
 *         schema:
 *           type: string
 *         example: "game_1"
 *     responses:
 *       200:
 *         description: Jogo encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/Game'
 *             example:
 *               "game_1":
 *                 total_kills: 45
 *                 players: ["Dono da Bola", "Isgalamido", "Zeh"]
 *                 kills:
 *                   "Dono da Bola": 5
 *                   "Isgalamido": 18
 *                   "Zeh": 20
 *       404:
 *         $ref: '#/components/responses/JogoNaoEncontrado'
 *       500:
 *         $ref: '#/components/responses/ErroServidor'
 */
router.get("/games/:id", GameController.getGameById);

export default router;
