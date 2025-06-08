import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";
import { connectDB } from "./config/database";
import mongoose from "mongoose";
import { config } from "./config/environment";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", gameRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    banco_de_dados:
      mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
    configuracao: {
      porta: config.api.port,
      banco_de_dados: config.mongodb.database,
    },
  });
});

// Iniciar servidor
const iniciarServidor = async () => {
  try {
    await connectDB();
    console.log("Banco de dados conectado com sucesso!");

    app.listen(config.api.port, () => {
      console.log(`O servidor está rodando na porta ${config.api.port}`);
      console.log(`Acesse o MongoDB Express em: http://localhost:8081`);
      console.log(
        `Health check disponível em: http://localhost:${config.api.port}/health`
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();
