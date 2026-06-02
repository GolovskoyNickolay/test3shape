# Account Frontend Test

Welcome! Thanks for taking the time to work on this task. The setup below should get you running in a couple of minutes. The task description lives in [TASK.md](./TASK.md). The rest is up to you.

No one tells the story of how you code better than your code itself.

---

Angular 21 + Material + @ngrx/signals + Storybook. Mock backend via json-server.

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Run

In two terminals:

```bash
npm run api    # json-server on http://localhost:3000
npm start      # Angular dev server on http://localhost:4200
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run api` | Mock REST API from `db.json` |
| `npm test` | Run unit tests (Vitest) |
| `npm run lint` | Lint TS + HTML |
| `npm run lint:fix` | Lint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run storybook` | Storybook on http://localhost:6006 |
| `npm run build-storybook` | Static Storybook build |
