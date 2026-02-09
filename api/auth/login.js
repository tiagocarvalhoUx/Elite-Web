import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initDb } from "../_lib/db.js";
import { setCors } from "../_lib/auth.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";

async function ensureAdminExists(db) {
  const result = await db.execute({
    sql: "SELECT id FROM users WHERE username = ?",
    args: [ADMIN_USER],
  });

  if (result.rows.length === 0) {
    const hash = await bcrypt.hash(ADMIN_PASS, 10);
    await db.execute({
      sql: "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      args: [ADMIN_USER, hash],
    });
  }
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const db = await initDb();
    await ensureAdminExists(db);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username e password são obrigatórios",
      });
    }

    const result = await db.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      data: {
        token,
        user: { id: user.id, username: user.username },
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
    });
  }
}
