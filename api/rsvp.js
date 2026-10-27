// POST /api/rsvp: save one RSVP.
const { redis, KEY } = require("../lib/redis");

function text(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function count(value) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 20) : 0;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "object" && req.body ? req.body : {};

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return res.status(200).json({ ok: true });

  const name = text(body.name, 100);
  const attending = body.attending === "Yes" ? "Yes" : body.attending === "No" ? "No" : "";
  if (!name || !attending) return res.status(400).json({ error: "Name and attendance are required" });

  const rsvp = {
    name,
    attending,
    adults: attending === "Yes" ? Math.max(count(body.adults), 1) : 0,
    children: attending === "Yes" ? count(body.children) : 0,
    phone: text(body.phone, 30),
    message: text(body.message, 1000),
    at: new Date().toISOString(),
  };

  try {
    await redis("RPUSH", KEY, JSON.stringify(rsvp));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not save RSVP" });
  }
};
