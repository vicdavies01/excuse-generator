# The Excuse Generator

A web app that generates absurdly creative excuses for any situation. Pick a category, get a randomly assembled excuse built from mix-and-match British fragments.

Built with Node.js, Express, and EJS. Deployed on Vercel.

## Getting started

```bash
npm install
npm start        # http://localhost:3000
npm test         # run jest tests
```

## Project structure

```
excuse-generator/
├── app.js                    # Express server, routes
├── api/index.js              # Vercel serverless entry point
├── lib/excuses.js            # Excuse generation engine
├── views/index.ejs           # Page template (EJS)
├── public/style.css          # Styles (design system)
├── __tests__/excuses.test.js # Jest + Supertest tests
├── vercel.json               # Vercel deployment config
└── package.json
```

## How excuse generation works

Excuses are assembled from four fragment arrays in `lib/excuses.js`:

```
[opener] + [villain] + [action] + [resolution]
```

| Fragment    | Count | Example                                        |
|-------------|-------|------------------------------------------------|
| Openers     | 5 per category (45 total) | "I was bang on schedule until"    |
| Villains    | 15    | "a gang of foxes in tiny waistcoats"           |
| Actions     | 15    | "deployed a config change to prod at 4:59 on Friday" |
| Resolutions | 15    | "and long story short, I now own a goat called Gerald." |

This gives **16,875 unique excuses per category** (151,875 total across all 9 categories).

### Categories

| Key        | Button label    |
|------------|-----------------|
| `late`     | Late to Work    |
| `deadline` | Missed Deadline |
| `birthday` | Forgot Birthday |
| `gym`      | Skipped Gym     |
| `homework` | No Homework     |
| `meeting`  | Missed Meeting  |
| `deploy`   | Broke the Deploy |
| `standup`  | Late to Standup  |
| `pr`       | PR Not Reviewed  |

### Adding a new category

1. Add an opener array to `fragments.openers` in `lib/excuses.js`
2. Add the button label mapping in `views/index.ejs` (the ternary chain)
3. Tests auto-cover new categories via `getCategories()`

## Routes

| Method | Path                    | Description                    |
|--------|-------------------------|--------------------------------|
| GET    | `/`                     | Main page with category buttons |
| POST   | `/excuse`               | Generate excuse (form submit)  |
| GET    | `/api/excuse/:category` | JSON API for client-side fetch |

The frontend uses the JSON API via `fetch()` with a 2.5s loading animation.

## Design system

### Typography

**Font:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts)

| Style         | Size  | Line height | Weight | Usage                    |
|---------------|-------|-------------|--------|--------------------------|
| Heading / h1  | 40px  | 51px        | 700    | Page title               |
| Heading / h2  | 24px  | 32px        | 700    | "Your Excuse"            |
| Heading / h3  | 20px  | 26px        | 600    | Section headings         |
| Body / Large  | 16px  | 20px        | 400    | Excuse text              |
| Body / Regular| 14px  | 20px        | 500    | Buttons, subtitle        |
| Body / Small  | 12px  | 16px        | 400    | Nav, pro tip             |

### Colours

**Primary (Neutral)**

| Token | Hex       | Usage                        |
|-------|-----------|------------------------------|
| NL100 | `#1C1C1C` | Primary text, headings       |
| NL90  | `#333333` | Body text, section headings  |
| NL70  | `#606060` | Loading text                 |
| NL60  | `#777777` | Subtitle                     |
| NL40  | `#AAAAAA` | Nav, tip text                |
| NL20  | `#D2D2D2` | Borders, dividers            |
| NL10  | `#E8E8E8` | Page background              |

**Green (Interactive)**

| Token | Hex       | Usage                        |
|-------|-----------|------------------------------|
| GR100 | `#1EF398` | Buttons, active states, links|
| GR10  | `#E8FEF5` | Light green backgrounds      |

**Pink (Highlighting)**

| Token | Hex       | Usage                        |
|-------|-----------|------------------------------|
| PK100 | `#FF8EFF` | Accent borders               |
| PK10  | `#FFF5FF` | Light pink backgrounds       |

**Gradient (Excuse & loading boxes)**

```css
/* Excuse box - solid */
background: linear-gradient(135deg, #FF8EFF 0%, #A45BF0 50%, #4A90F7 100%);

/* Loading box - transparent */
background: linear-gradient(135deg,
  rgba(255, 142, 255, 0.4) 0%,
  rgba(164, 91, 240, 0.4) 50%,
  rgba(74, 144, 247, 0.4) 100%);
```

### Buttons

| Type      | Background     | Border          | Text      | Padding    | Radius |
|-----------|---------------|-----------------|-----------|------------|--------|
| Primary   | `#1EF398`     | `#1EF398`       | `#1C1C1C` | 8px 12px   | 6px    |
| Secondary | transparent   | `#1EF398`       | `#1C1C1C` | 8px 12px   | 6px    |

All buttons: font-size 14px, line-height 20px, font-weight 700.

Hover state: fills `#1EF398`. Focus state: green glow ring `box-shadow: 0 0 0 3px rgba(30, 243, 152, 0.4)`.

## Deployment

Deployed on **Vercel** as a serverless function.

- `api/index.js` re-exports the Express app for Vercel's `@vercel/node` runtime
- `vercel.json` configures builds, static file routing, and includes `views/` and `lib/` in the function bundle
- Every push to `main` triggers auto-deployment

## Tests

```bash
npm test
```

7 tests covering:
- `generateExcuse()` returns strings, throws on unknown categories, produces varied output
- `getCategories()` returns all category names
- `GET /` returns the page with category buttons
- `POST /excuse` returns a page with an excuse
- `GET /api/excuse/:category` returns JSON
