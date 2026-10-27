# rsvp-event

RSVP page for the Aqeeqah of Zeba Nauman: Saturday, December 19, 2026, 2:00 PM, HMS Banquet Hall, Ajax.

Static site: a single `index.html`, no build step.

## Receiving RSVPs
RSVPs are sent to [Formspree](https://formspree.io), which emails each one to you and lists them all in its dashboard.
1. Create a free Formspree account and a new form.
2. Copy the form endpoint (`https://formspree.io/f/xxxxxxx`).
3. Paste it into `FORM_ENDPOINT` near the bottom of `index.html`.

## Deploy
1. In Vercel: Add New → Project → import `naumi-tech/rsvp-event`.
2. Framework preset: **Other**. Leave build command and output directory empty. Deploy.
3. Share the `*.vercel.app` URL (or add a custom domain under Settings → Domains).
