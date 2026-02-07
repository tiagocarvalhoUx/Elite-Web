const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// POST /api/auth/register - Registrar novo usuário (protegido, apenas admin pode criar)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validações
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
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE username = ?",
      [username],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Username já está em uso",
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Inserir usuário
    const [result] = await pool.execute(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, passwordHash],
    );

    res.status(201).json({
      success: true,
      message: "Usuário criado com sucesso",
      data: {
        id: result.insertId,
        username,
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

    // Validações
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username e password são obrigatórios",
      });
    }

    // Buscar usuário
    const [users] = await pool.execute(
      "SELECT id, username, password_hash FROM users WHERE username = ?",
      [username],
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const user = users[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
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

// GET /api/auth/verify - Verificar token
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
