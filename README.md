# WIM Frontend

SolidJS frontend for **[whoidentifies.me](https://whoidentifies.me)**, a project by [epicenter.works](https://epicenter.works) tracking uses of the European Digital Identity (EUDI) Wallet.

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
