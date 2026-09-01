# Orbit Portfolio — Local VS Code Setup

This folder is a local-test copy of the Orbit interactive portfolio landing page.

## Requirements

- Node.js 18 or newer
- npm, pnpm, or another Node package manager

## Run locally

```bash
pnpm install
pnpm run dev
```

Open the local URL printed by Vite, usually `http://localhost:3000`.

## Useful checks

```bash
pnpm run check
pnpm run build
```

The local package includes the hero image and Orbit mark under `client/public/assets/`. The project visuals are rendered as CSS specimens, so no other image downloads are required.

## Notes

The contact email, social profile links, project titles, and case-study buttons are sample content in `client/src/pages/Home.tsx`; replace them with your own details before publishing.
