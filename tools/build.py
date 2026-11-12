#!/usr/bin/env python3
"""Assemble the static site: src/partials + src/pages/*.html -> site root.

Each page starts with a small front-matter block:
    ---
    path: /vaults/
    title: Vaults — Orrith
    description: ...
    nav: on-dark | on-light
    ---
Run:  python3 tools/build.py
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
PARTIALS = {n: open(os.path.join(SRC, "partials", n + ".html"), encoding="utf-8").read() for n in ("head", "nav", "footer")}

def render(name):
    raw = open(os.path.join(SRC, "pages", name), encoding="utf-8").read()
    m = re.match(r"---\n(.*?)\n---\n(.*)$", raw, re.S)
    if not m:
        sys.exit(f"{name}: missing front matter")
    meta = dict(line.split(":", 1) for line in m.group(1).splitlines() if ":" in line)
    meta = {k.strip(): v.strip() for k, v in meta.items()}
    body = m.group(2)
    vars_ = {
        "src": name,
        "path": meta["path"],
        "title": meta["title"],
        "description": meta["description"],
        "nav_theme": meta.get("nav", "on-light"),
    }
    html = PARTIALS["head"] + PARTIALS["nav"] + body + PARTIALS["footer"]
    for k, v in vars_.items():
        html = html.replace("{{" + k + "}}", v)
    if meta["path"] == "/":
        out = os.path.join(ROOT, "index.html")
    elif meta["path"] == "/404/":
        out = os.path.join(ROOT, "404.html")  # GitHub Pages serves /404.html for missing routes
    else:
        out = os.path.join(ROOT, meta["path"].lstrip("/"), "index.html")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write(html)
    return meta["path"]

paths = sorted(render(n) for n in os.listdir(os.path.join(SRC, "pages")) if n.endswith(".html"))
sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in paths:
    if p == "/404/":
        continue
    sitemap.append(f"  <url><loc>https://orrith.xyz{p}</loc></url>")
sitemap.append("</urlset>")
open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sitemap) + "\n")
print("built:", ", ".join(paths))
