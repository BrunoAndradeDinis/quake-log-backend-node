export interface Kill {
  killer: string;
  victim: string;
  weapon?: string;
}

export interface Game {
  total_kills: number;
  players: string[];
  kills: {
    [player: string]: number;
  };
}

export interface GameCollection {
  [gameId: string]: Game;
}
