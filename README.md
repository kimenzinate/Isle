# Isle — Clickable Prototype

A pixel-faithful, mobile-first React prototype built from the [Isle Figma file](https://www.figma.com/design/tiwlu5nNEMi7iAosGL1OXT/Isle?node-id=75-770).

Viewport: **375 × 812 px** (iPhone-style frame)

## Screens & flow

| Screen | How to reach it |
|--------|-----------------|
| Splash | App start |
| Home | Get Started → Home tab |
| Check-in (3 steps + summary) | Home → “Check in with how you’re feeling” |
| Island tab | Tab bar → Island |
| Island create (type → background → comfort) | Check-in complete → Create my island, or Island → Create new island |
| Island detail | Suggested cards, Recently visited, or after island create |
| Comfort library | Island detail → Show all |
| Journal tab | Tab bar → Journal |
| Memory Wind-Down | Journal → Recommended card |
| Settings tab | Tab bar → Settings |

## Run locally

```bash
cd ~/Projects/isle-prototype
npm install
npm run dev
```

Vite opens the app in your browser at `http://localhost:5173`.

If Node isn’t installed yet, install it from [nodejs.org](https://nodejs.org/) first.

## Stack

- React 19 + Vite 6
- Plain CSS (design tokens in `src/styles/global.css`)
- State-based navigation (no router library)
- Figma MCP assets (remote URLs; download and commit for production use)

## Project structure

```
src/
  components/   StatusBar, TabBar, MoodSelector, ProgressBar, …
  screens/      One file group per major flow
  assets/       Figma image/icon URLs
  App.jsx       Screen routing & prototype state
```
