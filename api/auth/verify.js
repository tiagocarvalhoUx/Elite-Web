import { authenticateToken, setCors } from "../_lib/auth.js";

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const auth = authenticateToken(req);
  if (auth.error) {
    return res
      .status(auth.status)
      .json({ success: false, message: auth.error });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: auth.user.userId,
        username: auth.user.username,
      },
    },
  });
}
