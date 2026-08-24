# Alien Clock Visualizer

Interactive JavaScript solution to an exoplanet clock programming quiz.

## Rules

- 13 **kours** per planetary rotation
- 37 **pinutes** per kour
- 677 degrees per circle
- The kour hand and pinute hand rotate in opposite directions
- Return the smaller angle between the hands

## Core function

The calculation is kept separate from the interface so it can be tested and reused elsewhere.

```js
function calculateAlienAngle(kour, pinute) {
  const CIRCLE = 677;
  const KOURS = 13;
  const PINUTES = 37;

  const totalPinutes = kour * PINUTES + pinute;
  const kourAngle = totalPinutes * CIRCLE / (KOURS * PINUTES);
  const pinuteTravel = pinute * CIRCLE / PINUTES;

  const relativeAngle = (kourAngle + pinuteTravel) % CIRCLE;

  return Math.min(relativeAngle, CIRCLE - relativeAngle);
}
```

Because the two hands rotate in opposite directions, their relative movement is additive.

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

Open `index.html` directly in a browser.

Run the automated tests with:

```bash
node tests.js
```

## Live demo

This repository includes a GitHub Pages deployment workflow.

In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**. After the deployment workflow finishes, the app will be available at:

`https://tokyosaysryu.github.io/alien-clock-visualizer/`

## Design note

The same calculation can be reused to drive Unreal Engine UMG, transforms, dynamic materials, Niagara effects, or other real-time systems.
