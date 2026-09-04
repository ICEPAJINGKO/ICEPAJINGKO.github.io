# ICEPAJINGKO.github.io

Personal developer portfolio — dark, cinematic one-page site inspired by
[Christoph Nagel's portfolio](https://christoph-nagel.dev), built with plain
HTML/CSS/JS (no build step, works directly on GitHub Pages).

## Preview locally

Open `index.html` directly in a browser, or serve it so relative paths and
fonts behave exactly like production:

```
npx serve .
```

## Customize

- **Name / role / bio** — edit the text in `index.html` (search for "Your Name").
- **Photo** — save an image as `assets/profile.jpg` (used in the About
  section; falls back to initials if missing).
- **Projects** — duplicate a `.project-item` block in the `#work` section;
  swap in real titles, descriptions, tags, and links.
- **Skills** — edit the tag lists in the `#skills` section.
- **Contact** — update the `mailto:` link and social hrefs in `#contact`.
- **Colors / fonts** — all in the `:root` variables at the top of
  `css/style.css`.

## Hosting

This repo is named `<username>.github.io`, so GitHub Pages serves it
automatically from the `main` branch root — just push. If it's not live
after a few minutes, check **Settings → Pages** and confirm the source is
set to "Deploy from branch: main / (root)".