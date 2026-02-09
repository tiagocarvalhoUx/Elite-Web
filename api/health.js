import { setCors } from "./_lib/auth.js";

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  res.json({
    success: true,
    message: "Servidor está rodando!",
    timestamp: new Date().toISOString(),
  });
}
