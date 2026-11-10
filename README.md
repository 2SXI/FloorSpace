# RK Tiling – Floor Tile Visualiser

Optimised for slow networks: tiny `index.html` (~44 KB, styles inline) + `app.js` + `assets/` (tiles & rooms as separate WebP files loaded only when needed) + `sw.js` (caches everything after the first visit so repeat visits are near-instant).

**Upload the whole folder** (index.html, app.js, sw.js, assets/) keeping this structure. Must be served over http(s) such as GitHub Pages; double-clicking index.html from disk will not load the tiles.

When you change app.js or any image, bump `VERSION` in `sw.js` and `?v=` on the app.js tag in index.html.

## Publish on GitHub Pages
1. Create a repo and upload `index.html` (and this README).
2. Repo **Settings → Pages → Deploy from a branch → main / root**.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Settings you can edit inside index.html
- `BIZ_WA` – WhatsApp numbers for quote buttons.
- `LEADS` – optional Supabase URL/key to log leads (leave empty to disable).

Needs internet for the Manrope font and three.js (3D view).
