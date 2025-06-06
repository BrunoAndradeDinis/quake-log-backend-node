import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", gameRoutes);

// Rota de health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
