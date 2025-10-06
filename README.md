# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## Code Quality

```bash
# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:check
```

## Pre-commit Hooks

This project uses Husky + lint-staged for pre-commit hooks. On commit, it automatically:

- Runs ESLint with auto-fix on staged JS/TS files
- Runs Prettier on staged files
- Only processes staged files for performance

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)
