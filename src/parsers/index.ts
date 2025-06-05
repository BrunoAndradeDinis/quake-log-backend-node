import { LogParser } from "./classLogParser";
import path from "path";

export const parser = async () => {
  try {
    const parser = new LogParser();

    const games = await parser.parseLogFile(
      path.join(process.cwd(), "./src/games.log")
    );

    console.log("LogParser: ", games);
    console.log("--------------------------------");
    console.log("Primeiro jogo: ", Object.keys(games)[0], ":", games["game_1"]);
  } catch (error) {
    console.log("Erro ao processar o arquivo: ", error);
  }
};
