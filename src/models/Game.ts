import mongoose from "mongoose";

export interface IGame {
  gameId: string;
  total_kills: number;
  players: string[];
  kills: { [key: string]: number };
  createdAt?: Date;
  updatedAt?: Date;
}

const gameSchema = new mongoose.Schema<IGame>(
  {
    gameId: {
      type: String,
      required: true,
      unique: true,
    },
    total_kills: {
      type: Number,
      required: true,
    },
    players: {
      type: [String],
      required: true,
    },
    kills: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GameModel = mongoose.model<IGame>("Game", gameSchema);
