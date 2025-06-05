import fs from "fs";
import readline from "readline";
import { Kill, Game, GameCollection } from "../types";

// Classe
export class LogParser {
  private currentGame: Game | null = null;
  private currentGameId: number = 1;
  private games: GameCollection = {};
  private currentGameKills: Kill[] = [];

  async parseLogFile(filePath: string): Promise<GameCollection> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      this.parseLine(line);
    }

    if (this.currentGame) {
      this.finalizeGame();
    }

    return this.games;
  }

  private parseLine(line: string): void {
    if (line.includes("InitGame:")) {
      this.initializeNewGame();
    } else if (line.includes("Kill:")) {
      this.parseKill(line);
    } else if (line.includes("ShutdownGame:")) {
      this.finalizeGame();
    }
  }

  private initializeNewGame(): void {
    if (this.currentGame) {
      this.finalizeGame();
    }

    this.currentGame = {
      total_kills: 0,
      players: [],
      kills: {},
    };
    this.currentGameKills = [];
  }

  private parseKill(line: string): void {
    if (!this.currentGame) return;

    const killMatch = line.match(
      /Kill: (\d+) (\d+) (\d+): (.+) killed (.+) by (.+)/
    );
    if (!killMatch) return;

    const [, , , , killer, victim, weapon] = killMatch;
    const trimmedKiller = killer.trim();
    const trimmedVictim = victim.trim();

    const kill: Kill = {
      killer: trimmedKiller,
      victim: trimmedVictim,
      weapon: weapon.trim(),
    };

    this.currentGameKills.push(kill);
    this.updateGameStats(kill);
  }

  private updateGameStats(kill: Kill): void {
    if (!this.currentGame) return;

    const { killer, victim } = kill;

    this.currentGame.total_kills++;

    if (killer !== "<world>" && !this.currentGame.players.includes(killer)) {
      this.currentGame.players.push(killer);
    }
    if (!this.currentGame.players.includes(victim)) {
      this.currentGame.players.push(victim);
    }

    if (killer === "<world>") {
      this.currentGame.kills[victim] =
        (this.currentGame.kills[victim] || 0) - 1;
    } else {
      this.currentGame.kills[killer] =
        (this.currentGame.kills[killer] || 0) + 1;
    }
  }

  private finalizeGame(): void {
    if (this.currentGame) {
      this.games[`game_${this.currentGameId}`] = {
        total_kills: this.currentGame.total_kills,
        players: [...this.currentGame.players],
        kills: { ...this.currentGame.kills },
      };

      this.currentGameId++;
      this.currentGame = null;
      this.currentGameKills = [];
    }
  }
}