# rsvp-event

RSVP page for the Aqeeqah of Zeba Nauman: Saturday, December 19, 2026, 2:00 PM, HMS Banquet Hall, Ajax.

Plain HTML plus two Vercel serverless functions. No build step, no npm dependencies.

- `index.html`: the invitation and RSVP form (posts to `/api/rsvp`)
- `admin.html`: private guest list at `/admin` with totals and CSV download
- `api/rsvp.js`: saves an RSVP
- `api/rsvps.js`: lists RSVPs, requires the admin password
- `lib/redis.js`: tiny client for Upstash Redis, where RSVPs are stored

## Deploy on Vercel
1. Add New → Project → import `naumi-tech/rsvp-event`. Framework preset: **Other**, leave build settings empty. Deploy.
2. Project → **Storage** → Create Database → **Upstash for Redis** (free plan) → connect it to this project. This adds the database variables automatically.
3. Project → Settings → **Environment Variables** → add `ADMIN_PASSWORD` with a password of your choice.
4. Deployments → Redeploy, so the new variables take effect.

Share the site URL with guests. Open `<your-url>/admin` and enter the password to see RSVPs.
