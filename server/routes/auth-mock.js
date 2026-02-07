// Versão MOCK da autenticação - sem banco de dados
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const SALT_ROUNDS = 10;

// Usuário admin padrão (senha: admin123)
const mockUsers = [
  {
    id: 1,
    username: "admin",
    // Hash de "admin123" - gerado com bcrypt
    password_hash:
      "$2a$10$DMr4MPzrZSYi5gnLwn.vAewEpU0t7mSO4iZoUKtb.kTCfl91PrAyy",
  },
];

console.log("🔧 Auth Mock inicializado");
console.log(
  "👤 Usuários disponíveis:",
  mockUsers.map((u) => u.username),
);

// POST /api/auth/register - Registrar novo usuário
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username e password são obrigatórios",
      });
    }

    if (username.length < 3 || username.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Username deve ter entre 3 e 50 caracteres",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password deve ter pelo menos 6 caracteres",
      });
    }

    // Verificar se usuário já existe
    const existingUser = mockUsers.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username já está em uso",
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Criar novo usuário
    const newUser = {
      id: mockUsers.length + 1,
      username,
      password_hash: passwordHash,
    };

    mockUsers.push(newUser);

    console.log("✅ Usuário criado:", {
      id: newUser.id,
      username: newUser.username,
    });

    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      data: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});

// POST /api/auth/login - Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("🔑 Tentativa de login:", username);

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username e password são obrigatórios",
      });
    }

    // Buscar usuário
    const user = mockUsers.find((u) => u.username === username);

    if (!user) {
      console.log("❌ Usuário não encontrado:", username);
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      console.log("❌ Senha incorreta para:", username);
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    console.log("✅ Login bem-sucedido:", username);

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
});

// GET /api/auth/verify - Verificar token (mock)
router.get("/verify", authenticateToken, async (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.userId,
        username: req.user.username,
      },
    },
  });
});

module.exports = router;
