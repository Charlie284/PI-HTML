# 10 Million Digits of Pi

This repository contains the first 10,000,000 digits after the decimal point of π in
`public/Pi.txt`, plus a small browser viewer built with Vite, React, TypeScript, Tailwind CSS v4,
React Router, Framer Motion and Lenis.

## Contents

- `public/Pi.txt` is an ASCII dataset containing exactly 10,000,000 decimal digits. It omits the
  leading `3.` so programs can consume the fractional digits directly. Vite serves it as a static
  asset (`/Pi.txt`) and copies it unchanged into `dist/`.
- `src/` is the React viewer: it fetches `Pi.txt` at runtime and renders `3.` followed by the
  dataset.
- `tests/test_pi_data.py` validates the dataset.

The viewer has no backend; any static file host works.

## Development

```sh
npm install
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) and build to dist/
npm run preview  # preview the production build
```

You can open `public/Pi.txt` directly in a text editor or process it with any tool that can handle
a roughly 10 MB text file.

## Verify the dataset

The test suite protects the digit count, numeric format, known prefix, and SHA-256 checksum:

```sh
python3 -m unittest discover -s tests -v
```

CI runs this test plus `npm ci && npm run build`.

## License

See [LICENSE](LICENSE) for usage and redistribution terms.
