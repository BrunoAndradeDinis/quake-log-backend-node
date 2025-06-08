import { connectDB } from "../config/database";
import { GameService } from "../services/GameService";
import { LogParser } from "../services/LogParser";
import path from "path";

async function seed() {
  try {
    // Conectar ao MongoDB
    await connectDB();
    console.log("✅ Conectado ao banco de dados");

    // Limpar dados existentes
    await GameService.deleteAllGames();
    console.log("🗑️  Dados anteriores removidos");

    // Analisar arquivo de log
    const logParser = new LogParser();
    const logPath = path.join(__dirname, "../games.log");
    console.log("📖 Analisando arquivo de log...");
    const games = await logParser.parseLogFile(logPath);

    // Transformar objeto de jogos em array para MongoDB
    const gamesArray = Object.entries(games).map(([gameId, gameData]) => ({
      gameId,
      total_kills: gameData.total_kills,
      players: gameData.players,
      kills: gameData.kills,
    }));

    // Inserir jogos no MongoDB
    await GameService.createManyGames(gamesArray);

    console.log(
      `✨ Banco de dados populado com sucesso! ${gamesArray.length} jogos importados.`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao popular banco de dados:", error);
    process.exit(1);
  }
}

seed();
