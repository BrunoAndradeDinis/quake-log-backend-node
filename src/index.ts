import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";
import { connectDB } from "./config/database";
import mongoose from "mongoose";
import { config } from "./config/environment";

const app = express();

// Conectar ao banco de dados
connectDB()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", gameRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
    config: {
      port: config.api.port,
      database: config.mongodb.database,
    },
  });
});

// Iniciar servidor
app.listen(config.api.port, () => {
  console.log(`O servidor está rodando na porta ${config.api.port}`);
});
