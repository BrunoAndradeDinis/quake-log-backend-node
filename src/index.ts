import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import gameRoutes from "./routes/gameRoutes";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { config } from "./config/environment";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/games", gameRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
);

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    console.log("Banco de dados conectado com sucesso!");

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Health check: http://localhost:${port}/health`);
      console.log(`API Games: http://localhost:${port}/games`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();
