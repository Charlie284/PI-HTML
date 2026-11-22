# 10 Million Digits of Pi

A static site that displays the first 10,000,000 digits after the decimal point of π in the
browser. The digits ship as a plain text asset (`public/Pi.txt`) and a small React app fetches
and renders them. There is no backend — any static file host can serve the site.

## Quick start

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc -b) and build to dist/
npm run preview  # preview the production build locally
```

## Repository layout

| Path | Purpose |
| --- | --- |
| `public/Pi.txt` | The dataset: 10,000,000 ASCII decimal digits of π (see below) |
| `src/` | React viewer source code |
| `tests/test_pi_data.py` | Python suite that validates the dataset |
| `.github/workflows/ci.yml` | CI: dataset validation + `npm ci && npm run build` |
| `index.html` | HTML entrypoint mounted by `src/main.tsx` |

## The dataset (`public/Pi.txt`)

- Exactly 10,000,000 characters, all ASCII decimal digits.
- The leading `3.` is **omitted** so programs can consume the fractional digits directly; the
  viewer prepends `3.` at render time.
- Vite serves it unchanged as a static asset at `/Pi.txt` in dev and copies it verbatim into
  `dist/` on build (CI verifies this with `cmp`).
- Integrity is pinned by a SHA-256 checksum:
  `c3d3dd4bd5d1051fd5995db983eb898ac0308189a20c46e80e5f67d5f415edf1`
- The file is ~10 MB; it opens in any editor or tool that handles large text files.

## How the viewer works

- `src/main.tsx` mounts the app inside `BrowserRouter` (React Router).
- `src/App.tsx` wraps the routes in `ReactLenis` (Lenis smooth scrolling) and defines two
  routes: `/` → `PiViewer`, `*` → `NotFound`.
- `src/hooks/usePiDigits.ts` fetches `${BASE_URL}Pi.txt`, aborts on unmount, and returns a
  `loading` / `error` / `ready` state with the text prefixed by `3.`.
- `src/components/PiDigits.tsx` renders the digits as a plain element (no composited/animated
  layer — the string is ~10 MB); only the short status messages fade in via Framer Motion.
- Styling is Tailwind CSS v4 (`@tailwindcss/vite` plugin); the theme colors and mono font are
  declared in `src/index.css` via `@theme`, and the base `m-0 bg-page font-mono text-fg`
  classes live on `<body>` in `index.html`.

## Testing

The Python test suite guards the dataset's length, format, known prefix, and checksum:

```sh
python3 -m unittest discover -s tests -v
```

It uses only the standard library (`unittest`, `hashlib`, `pathlib`).

## CI

`.github/workflows/ci.yml` runs two jobs on every push and pull request:

- `verify-data` — runs the Python dataset tests on Python 3.13.
- `build` — `npm ci && npm run build` on Node 22, then confirms `dist/Pi.txt` is byte-identical
  to `public/Pi.txt`.

## Deployment

`npm run build` produces a fully static `dist/` directory (HTML + JS bundle + `Pi.txt`).
Deploy it to any static host. The app uses `BrowserRouter`, so hosts that serve a single page
app should rewrite unknown paths to `index.html` (the `*` route renders the 404 page).

## License

MIT — see [LICENSE](LICENSE).
