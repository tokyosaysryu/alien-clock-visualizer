# Alien Clock Visualizer

Interactive JavaScript solution to an exoplanet clock programming quiz.

## Rules
- 13 hours per planetary rotation
- 37 minutes per hour
- 677 degrees per circle
- Hour and minute hands rotate in opposite directions
- Return the smaller angle between the hands

## Test cases
| Input | Expected |
|---|---:|
| `00:00` | `0.000°` |
| `01:00` | `52.077°` |
| `00:01` | `19.705°` |
| `01:01` | `71.782°` |
| `06:00` | `312.462°` |
| `06:18` | `9.852°` |
| `12:36` | `19.705°` |

## Run locally
Open `index.html` in a browser.

Run tests with:
```bash
node tests.js
```

## GitHub Pages
Enable Pages from the `main` branch and repository root.

## Design note
The calculation is kept separate from the UI so it can be unit-tested and reused in Unreal Engine, UMG, materials, Niagara, or other real-time systems.
