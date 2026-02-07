const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

if (!process.env.JWT_SECRET) {
  console.warn(
    "⚠️  JWT_SECRET não definido. Usando fallback para desenvolvimento/mock.",
  );
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acesso negado. Token não fornecido.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token expirado.",
      });
    }
    return res.status(403).json({
      success: false,
      message: "Token inválido.",
    });
  }
};

module.exports = {
  authenticateToken,
};
