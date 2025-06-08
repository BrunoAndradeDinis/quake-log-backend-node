import fs from "fs";
import { Kill, Game, GameCollection } from "../types";

export class LogParser {
  private currentGame: Game | null = null;
  private currentGameId: number = 1;
  private currentGameKills: Kill[] = [];
  private games: GameCollection = {};

  public async parseLogFile(filePath: string): Promise<GameCollection> {
    const fileContent = await fs.promises.readFile(filePath, "utf8");
    const lines = fileContent.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        this.parseLine(trimmedLine);
      }
    }

    if (this.currentGame) {
      this.finalizeGame();
    }

    return this.games;
  }

  private parseLine(line: string): void {
    if (line.includes("InitGame:")) {
      if (this.currentGame) {
        this.finalizeGame();
      }
      this.initializeGame();
    } else if (line.includes("Kill:")) {
      this.parseKill(line);
    } else if (line.includes("ShutdownGame:")) {
      if (this.currentGame) {
        this.finalizeGame();
      }
    }
  }

  private initializeGame(): void {
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
    if (!killMatch || killMatch.length !== 7) return;

    const [, , , , killer, victim, weapon] = killMatch;
    if (!killer || !victim) return;

    const trimmedKiller = killer.trim();
    const trimmedVictim = victim.trim();

    const kill: Kill = {
      killer: trimmedKiller,
      victim: trimmedVictim,
      weapon: weapon.trim(),
    };

    this.currentGameKills.push(kill);
    this.processKill(kill);
  }

  private processKill(kill: Kill): void {
    if (!this.currentGame) return;

    const { killer, victim } = kill;

    if (killer !== "<world>" && !this.currentGame.players.includes(killer)) {
      this.currentGame.players.push(killer);
      this.currentGame.kills[killer] = 0;
    }
    if (!this.currentGame.players.includes(victim)) {
      this.currentGame.players.push(victim);
      this.currentGame.kills[victim] = 0;
    }

    this.currentGame.total_kills++;

    if (killer === "<world>") {
      this.currentGame.kills[victim] =
        (this.currentGame.kills[victim] || 0) - 1;
    } else if (killer === victim) {
      this.currentGame.kills[killer] =
        (this.currentGame.kills[killer] || 0) - 1;
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
