import mongoose from "mongoose";
import { config } from "./environment";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodb.url);
    console.log("MongoDB conectado com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
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
