import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  MONGODB_PORT = "27017",
} = process.env;

const MONGODB_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=admin`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB desconectado");
});

mongoose.connection.on("error", (err) => {
  console.error("Erro de conexão com MongoDB:", err);
});

export default connectDB;
