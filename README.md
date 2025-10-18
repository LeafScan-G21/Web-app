## LeafScan Web App

Plant health diagnosis, community forum, and weather insights—built with React, Vite, Tailwind, and Supabase.

This app lets users detect plant diseases, get care tips and local weather forecasts, and collaborate via a community forum. It features smooth, modern UI with framer-motion animations and a cohesive green theme.

## Table of Contents

- Prerequisites
- Quick Start
- Environment Variables
- Scripts
- Tech Stack
- Project Structure
- Key Features
- Styling & Animations
- Testing & Linting
- Troubleshooting

## Prerequisites

- Node.js 18+ (recommended)
- npm (bundled with Node)

Tip (optional): use nvm to switch Node versions.

## Quick Start

1. Clone and enter the repo

```bash
git clone https://github.com/LeafScan-G21/Web-app.git
cd Web-app
```

2. Install dependencies

```bash
npm install
```

3. Configure environment (see next section) and then run the dev server

```bash
npm run dev
```

The app runs at http://localhost:5173 by default.

To expose on your LAN during development:

```bash
npm run host
```

To build and preview production output:

```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root. Vite only exposes variables that start with `VITE_`.

Example:

```env
VITE_FORUM_SERVICE_URL=http://localhost:8000
VITE_AUTH_SERVICE_URL=http://localhost:8010
VITE_WEATHER_SERVICE_URL=http://127.0.0.1:8020
VITE_PREPROCESSING_SERVICE_URL=http://localhost:8040
VITE_PREDICTION_SERVICE_URL=http://localhost:8030

# Supabase (required for auth)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_public_anon_key

# Optional consolidated backend URL
VITE_BACKEND_URL=http://localhost:8000
```

Notes:

- The Supabase anon key is a public client key; still treat it with care.
- Ensure your backend services are reachable (ports 8000–8040 as shown above) or update the URLs accordingly.
- After changing env vars, restart the dev server.

## Scripts

All scripts are defined in `package.json`.

- `npm run dev` — start Vite dev server
- `npm run host` — start the dev server and bind to your local network
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm test` — run Jest tests once
- `npm run test:watch` — run Jest tests in watch mode

## Tech Stack

- React 19, React Router 7
- Vite 7 (build tool)
- Tailwind CSS 4
- framer-motion (animations)
- lucide-react (icons)
- Supabase JS (auth)
- Axios (HTTP)
- Lottie (animations), Recharts (charts), qs (query utilities)
- Jest + Testing Library (unit/integration tests)
- ESLint 9 (with react-hooks plugin)

## Project Structure

```
src/
  assets/                 # images, lottie json, etc.
  components/
    layout/               # MainLayout, ForumLayout
    ui/                   # Navigation, Footer, FormField, etc.
    forum/                # Button, Input, Pagination, PostCard, modals
    history/              # History components
    weather/              # AddressInput, WeatherForecastTable
    loaders/              # Loading/placeholder components
  context/                # AuthContext
  hooks/                  # useGeolocation
  pages/
    forum/                # Forum index, AddPost, PostView
    weather/              # WeatherDataShow, WeatherAnimation
    ...                   # Home, Dashboard, Diagnosis, etc.
  services/
    auth/                 # supabaseClient, user
    forum/                # post, comment, vote
    weather/              # forecast
    history/              # historyService
  App.jsx
  main.jsx
  index.css
```

## Key Features

- Plant disease diagnosis and prediction
- Forum: posts, comments, voting, pagination, edit/delete
- User authentication and protected routes (Supabase)
- Weather forecast by geolocation or address
- History tracking and rich UI components
- Responsive, accessible design

## Styling & Animations

- Tailwind CSS 4 utilities with a cohesive green theme
- Consistent gradients, rounded corners, and shadow system
- framer-motion for page and element animations:
  - Slide/fade entrances, staggered appearances
  - Interactive hover/tap effects, modals with AnimatePresence
- Iconography via lucide-react

## Testing & Linting

- Jest with `@testing-library/react` and `@testing-library/jest-dom`
- Run tests:

```bash
npm test
# or
npm run test:watch
```

- ESLint (React + hooks):

```bash
npm run lint
```

## Troubleshooting

- Env vars not taking effect: ensure the `VITE_` prefix and restart the dev server.
- CORS or network errors: verify service URLs in `.env` and that services are running.
- Geolocation denied: the Weather page supports manual address input.
- Node version issues: use Node 18+; try clearing `node_modules` and reinstalling.
- Port conflicts: Vite defaults to 5173; stop other apps or set a different port.

## Contributing

PRs are welcome. Please keep UI changes consistent with the green theme and framer-motion patterns used across pages.

## License

This repository does not currently include a license file. Add one (e.g., MIT) if you plan to open-source the project.
