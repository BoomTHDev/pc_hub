# PC Hub Frontend

React + TypeScript + Vite + Tailwind CSS v4 + React Router v7

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Create `.env` from `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:3001
```

For local dev, this project also supports `/api` via Vite proxy.

## Project Structure

```text
src/
  app/                # app bootstrap, router, root layout
  entities/           # domain types shared across features
  features/           # business use cases by feature (api, hooks, services)
  pages/              # route-level UI
  shared/
    config/           # env/config
    lib/              # reusable infra (http client)
    ui/               # reusable presentational components
```

## Architecture Rules

- Keep API calls in `features/*/api`.
- Keep route composition in `app/router.tsx`.
- Keep reusable UI in `shared/ui`.
- Keep domain contracts in `entities`.
- Pages assemble data + components, but avoid low-level fetch logic.

This separation makes refactoring and framework migration easier because domain/api logic stays isolated from view implementation.
