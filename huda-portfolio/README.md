# Huda | AI Automation Portfolio (Phase 3: full site, no Admin Panel yet)

Plain HTML, CSS and JavaScript. No build step, no dependencies, no backend yet.

## Run
Needs Node.js 16+ (no installs): `node server.js`, then open http://localhost:3000/ (site) and http://localhost:3000/admin/ (Admin Panel). See `HOW-TO-GO-LIVE.txt` for hosting steps in plain language.
Opening `index.html` directly from disk still shows the site with its default content, but the Admin Panel needs `server.js`.
Fonts (Sora, Figtree) load from Google Fonts; system fonts are the fallback if offline.

## Admin Panel (`/admin/`)
- Default login for testing: `admin` / `Admin@123`. Change it at first sign-in (Password & account).
- Edits are saved by `server.js` into `data/content.json` (previous version kept as `content.backup.json`); uploaded pictures go to `uploads/`; the password is stored hashed in `private/auth.json` (created on first start).
- Pages read `data/content.json` on every load, so a save is live on the next page load. `js/content.js` holds the built-in defaults.
- Security: scrypt-hashed password, HttpOnly session cookie, CSRF token on every change, login lockout (5 failures = 5 minutes), uploads checked by file signature (JPG/PNG/GIF/WebP only, 5 MB max), social links must be https. `private/`, `server.js` and backups are never served.
- Limits: sessions are kept in memory (a server restart signs you out). Set the `PORT` environment variable if your host requires it. Serve over HTTPS in production.

## Design system (reused on every future page)
- Colors: bg #111214, bg2 #191B20, orange #FF6A24, blue #2788FF, text #F5F5F5, muted #A7A9B0, border #2a2d34
- Fonts: Sora (headings), Figtree (body)
- Motion: one staggered hero entrance, soft scroll reveals once, slow blurred background drift and pulse. No lines, scans or beams. Reduced motion respected.

## Update content
Everything editable is in `js/content.js` (name, title, tagline, intro, stats, services, projects, tools, testimonials, email, socials). Replace the hero image by changing `heroImage` (default `assets/hero-workflow.svg`).
- Projects marked `demo:true` display a "Demo concept" label. Set `demo:false` only for real work.
- Testimonials: add `{name, role, org, text}` objects to `testimonials`. While empty, a "How I Work" principles carousel shows instead.
- Email is a placeholder (`hello@your-domain.com`); set `emailIsPlaceholder:false` after changing it.

## Placeholders and limitations
- Environment variables: optional `PORT` (default 3000).

## Pages
- `index.html` Home, `services.html`, `portfolio.html`, `about.html`, `contact.html`. The Process section lives on Home (menu links to it).
- Shared navigation and footer: `js/shell.js` (links in `js/content.js` > `nav`). Shared icons and thumbnails: `js/art.js`. Services, About and Contact render from `js/pages.js`.
- Edit everything in `js/content.js`: `hero`, `services` (benefits, optional `price`), `process`, `about`, `contact`, `portfolio`, `tools`, `email`, `socials`.
- Services: four cards in `services`, page text in `servicesPage`. Leave `price:""` to show "Custom Quote"; set e.g. `price:"$50"` to show "Starting at $50 per workflow" (the `unit` field). Only add prices you really offer. The same four services appear as a preview on Home.
- About milestones with `confirmed:false` show a "Placeholder" tag. Replace them with real ones.
- Contact page: real email, "WhatsApp available on request" text, and social icons from `socials` in `js/content.js` (add `{label, icon:"instagram", url}` once you have the Instagram URL). The form has Name, Email, Project type (taken from your services), Budget (`contact.budgets`) and Message. It has no server: submitting opens the visitor's email app with the message filled in, and offers a Gmail link as a fallback. Nothing is stored. Real form delivery would need a backend, planned with the Admin Panel.

## Portfolio page
- Data: `js/content.js` > `portfolio` (categories, items). Fields per item: `id`, `cat`, `title`, `short` (purpose), `full` (details), `steps` (workflow), `tools` (leave [] until confirmed), `benefit`, `thumb`, `demo`.
- Thumbnails: leave `thumb:""` for the generated placeholder, or set an image path (a missing image falls back to the placeholder).
- URLs: `portfolio.html#workflow`, `#agents`, `#integrations` open a filter; `#p-<project-id>` opens a project.
