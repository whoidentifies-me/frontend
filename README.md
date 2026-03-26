<p align="center">
  <img src="docs/img/logo-wim-white-bg.png" alt="whoidentifies.me" height="140">
</p>

<h3 align="center">whoidentifies.me &mdash; Frontend</h3>

<p align="center">
  Web interface for the transparency platform tracking which personal data is requested through the <a href="https://en.wikipedia.org/wiki/EUDI_Wallet">EUDI eIDAS Wallet</a>. 
</p>

<p align="center">
  <a href="https://whoidentifies.me"><strong>Homepage</strong></a> &nbsp;&bull;&nbsp;
  <a href="https://demo.whoidentifies.me"><strong>Live Demo</strong></a> &nbsp;&bull;&nbsp;
  <a href="https://github.com/whoidentifies-me/help/blob/main/README.md"><strong>Help</strong></a> &nbsp;&bull;&nbsp;
  <a href="https://github.com/whoidentifies-me/api"><strong>API</strong></a>
</p>

---

This repository contains the SolidJS frontend for whoidentifies.me, a platform that creates transparency around the emerging European Digital Identity ecosystem.

## Tech Stack

- [SolidJS](https://www.solidjs.com/) + [SolidStart](https://start.solidjs.com/) — framework & SSR
- [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) — styling
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Orval](https://orval.dev/) — API client generation from OpenAPI spec

## Prerequisites

- Node.js >= 22

## Development

```bash
npm install
npm run dev
```

The dev server proxies `/api/*` requests to `localhost:8080` (the API server).

Use `npm run dev:spa` to run in SPA mode (no SSR).

## Scripts

### Development

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server (SSR) |
| `npm run dev:spa` | Start development server (SPA) |
| `npm run start`   | Start production server        |

### Build

| Script              | Description                |
| ------------------- | -------------------------- |
| `npm run build`     | Build for production (SSR) |
| `npm run build:spa` | Build for production (SPA) |

### Code Quality

| Script                 | Description               |
| ---------------------- | ------------------------- |
| `npm run typecheck`    | Type-check TypeScript     |
| `npm run lint`         | Lint code                 |
| `npm run lint:fix`     | Lint and auto-fix         |
| `npm run lint:css`     | Lint CSS                  |
| `npm run lint:css:fix` | Lint CSS and auto-fix     |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

### API

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run api:fetch`    | Fetch OpenAPI spec from the staging API |
| `npm run api:generate` | Generate API clients via Orval          |

API clients in `src/api/generated/` are auto-generated from an OpenAPI spec. Run `api:fetch` to pull the latest spec, then `api:generate` to regenerate the clients. Generation also runs automatically before `dev` and `build`.

---

<p align="center">
  <a href="https://epicenter.works">
    <img src="docs/img/ew_logo_farbe_s.jpg" alt="epicenter.works" height="60">
  </a>
</p>

<p align="center">
  A project by the digital rights NGO <a href="https://epicenter.works"><strong>epicenter.works</strong></a>.<br>
  Our main organization on GitHub: <a href="https://github.com/AKVorrat">AKVorrat</a>
</p>
