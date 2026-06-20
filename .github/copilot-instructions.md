# DivinePath AI Agent Instructions

## Project Overview
DivinePath is a React-based web application for Hindu spiritual content (Literature, Panchang, Mantras). It uses Netlify Functions for backend logic and a custom data pipeline for content generation.

## Tech Stack
- **Frontend**: React 19, React Router 6, Create React App
- **Backend**: Netlify Functions (Node.js)
- **AI**: Google Gemini API with hybrid rate limiting (15/min per user + 500/day global)
- **Storage**: Netlify Blobs for global rate limit tracking
- **Data Processing**: Node.js (Playwright) and Python scripts
- **Testing**: Jest (Unit), Playwright (E2E)
- **Styling**: CSS Modules / Standard CSS (e.g., `App.css`, `FestivalsPage.css`)

## Architecture & Core Concepts

### Literature System
- **Data Structure**: Literature content is stored in `src/data/literature/`.
  - Organized by text (e.g., `ramayana`, `rigveda`).
  - Hierarchical structure: Text -> Section (Kanda/Parva/Mandala) -> Scenes.
  - Each text has an `index.js` aggregator.
- **Components**:
  - `LiteratureDetailPage.js`: Entry point for a text.
  - `RamayanaTOCPage.js`: Table of Contents (handles all text types).
  - `StoryPlayerPage.js`: Renders the narrative content.

### Panchang (Calendar)
- **Logic**: Hybrid approach.
  - `src/hooks/usePanchangamForDate.js`: Main hook.
  - `calculateBasicPanchang()`: Local fallback calculation.
  - `netlify/functions/panchangam-for-date.js`: Serverless function for API data (Prokerala).
- **UI**: Integrated into `FestivalsPage.js`.

### Data Pipeline (`scripts/`)
- **Scraping**: `batch-scrape-playwright.js`, `scrape-universal.js`.
- **Processing**: `generate-mantras.js`, `format-ashtottaram.js`.
- **Output**: `scripts/output/` (often manually moved to `src/data/`).

## Development Workflow

### Essential Commands
- **Start Dev Server**: `npm start` (clears cache & strips sourcemaps automatically)
- **Build**: `npm run build`
- **Linting**: `npm run lint` / `npm run lint:fix`
- **Pre-Push Check**: `./pre-push.sh` (ALWAYS run this before pushing)

### Testing
- **Unit Tests**: `npm test`
- **E2E Tests**: `npm run test-playwright`

## Coding Conventions

### React Components
- Use functional components with Hooks.
- Co-locate CSS files with components (e.g., `FestivalsPage.js` + `FestivalsPage.css`).
- Use `src/hooks/` for reusable logic (e.g., `usePanchangamForDate`).

### Data Management
- **Literature**: When adding new texts, follow the `ramcharitmanas` or `rigveda` pattern.
  - Create a folder in `src/data/literature/`.
  - Create individual files for sections (e.g., `bal_kand.js`).
  - Export an aggregator object in `index.js`.
  - Update `src/data/literature/index.js` to include the new text.

### Netlify Functions
- Located in `netlify/functions/`.
- Use CommonJS (`require`/`module.exports`).
- Handle errors gracefully and return appropriate HTTP status codes.
- **Rate Limiting**: `ai-chat.js` enforces global 500 calls/day limit using Netlify Blobs.
- Returns HTTP 429 when global limit reached.

## Common Tasks
- **Adding a new Deity**:
  1. Scrape data using `scripts/scrape-universal.js`.
  2. Process output in `scripts/output/`.
  3. Create component/data file in `src/`.
- **Updating Panchang**:
  - Modify `src/hooks/usePanchangamForDate.js` for frontend logic.
  - Update `netlify/functions/panchangam-for-date.js` for backend logic.
