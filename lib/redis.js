// Minimal Upstash Redis REST client (no dependencies).
// Vercel's Upstash integration sets either KV_REST_API_* or UPSTASH_REDIS_REST_* variables.
const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(...command) {
  if (!URL || !TOKEN) throw new Error("Redis is not configured");
  const res = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `Redis error ${res.status}`);
  return json.result;
}

module.exports = { redis, KEY: "rsvps" };
