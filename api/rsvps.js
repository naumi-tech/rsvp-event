// GET /api/rsvps: list all RSVPs. Requires the ADMIN_PASSWORD as a Bearer token.
const crypto = require("crypto");
const { redis, KEY } = require("../lib/redis");

function authorized(req) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const given = (req.headers.authorization || "").replace(/^Bearer /, "");
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(password).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!authorized(req)) return res.status(401).json({ error: "Wrong password" });

  try {
    const rows = await redis("LRANGE", KEY, 0, -1);
    return res.status(200).json({ rsvps: rows.map((r) => JSON.parse(r)) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not load RSVPs" });
  }
};
