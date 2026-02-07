// Versão sem banco de dados - apenas para testes
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth-mock");
const projectsRoutes = require("./routes/projects-mock");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor está rodando! (Modo MOCK - sem banco de dados)",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`⚠️  MODO MOCK: Dados em memória (serão perdidos ao reiniciar)`);
  console.log(`🔑 Auth API: http://0.0.0.0:${PORT}/api/auth`);
  console.log(`📂 Projects API: http://0.0.0.0:${PORT}/api/projects`);
  console.log(`❤️ Health Check: http://0.0.0.0:${PORT}/api/health`);
});
