  // Interfaces
interface Kill {
  killer: string;
  victim: string;
  weapon: string;
}

interface Game {
  total_kills: number;
  players: string[];
  kills: {
    [player: string]: number;
  };
}

interface GameCollection {
  [game_id: string]: Game;
}

export { Kill, Game, GameCollection };
