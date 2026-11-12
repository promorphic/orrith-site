# orrith.xyz

Static site for Orrith — shipping finance, onchain. Served by GitHub Pages from the `main` branch (custom domain in `CNAME`). Push to `main` and it deploys.

## Editing

Pages live in `src/pages/*.html`; the shared header, nav and footer in `src/partials/`. Each page starts with a small front-matter block (path, title, description, nav theme). After editing, rebuild the output files at the repo root:

```bash
python3 tools/build.py
```

Commit both the source and the generated files. Do not edit the root `index.html` or `*/index.html` directly — the next build overwrites them.

- `styles.css` — all styling. Colour and type tokens are at the top.
- `script.js` — nav, current-page marker, reveal-on-scroll.
- `assets/fonts/` — Satoshi and General Sans (Fontshare licence). JetBrains Mono is loaded from Google Fonts.
- `assets/img/` — hero photo (CC BY-SA 3.0, credited on `/legal/`), OG image, ABN logo.

## Where things are

| What | Where |
|---|---|
| Vault terms ($1m · 4.5% · 45d) | `src/pages/index.html`, `src/pages/vaults.html`, `src/pages/vaults-abn-voyage-01.html` |
| Vault status (Raising / Deployed / Repaid) | the `status status-*` span on the same three pages and the hero ticker on `index.html` |
| Market stats and sources | the stats block in `src/pages/index.html` |
| Contact email / Telegram | `src/partials/footer.html` and the `mailto:` / `t.me` links on each page |
| Legal copy (DRAFT, pending counsel) | `src/pages/legal.html` |

## Local preview

```bash
python3 -m http.server 5188
```

Then open http://localhost:5188.
