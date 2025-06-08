import mongoose, { Schema, Document } from "mongoose";

export interface IKills {
  [player: string]: number;
}

export interface IGame extends Document {
  game_id: number;
  total_kills: number;
  players: string[];
  kills: IKills;
  created_at: Date;
}

const GameSchema: Schema = new Schema({
  game_id: {
    type: Number,
    required: true,
    unique: true,
  },
  total_kills: {
    type: Number,
    required: true,
    default: 0,
  },
  players: [
    {
      type: String,
      required: true,
    },
  ],
  kills: {
    type: Map,
    of: Number,
    default: new Map(),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IGame>("Game", GameSchema);
