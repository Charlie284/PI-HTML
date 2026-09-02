# 10 Million Digits of Pi

This repository contains the first 10,000,000 digits after the decimal point of π in
`Pi.txt`, plus a small browser viewer in `index.html`.

## Contents

- `Pi.txt` is an ASCII dataset containing exactly 10,000,000 decimal digits. It omits the
  leading `3.` so programs can consume the fractional digits directly.
- `index.html` uses JavaScript to fetch `Pi.txt` and render `3.` followed by the dataset.

Both files work offline once downloaded. The browser viewer has no third-party dependencies, but
it is not a self-contained HTML document: it requires `Pi.txt` beside it and must be served over
HTTP because browsers commonly block `fetch` from `file://` pages.

## View in a browser

From the repository directory, start a local server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. You can open `Pi.txt` directly in a text editor or process it
with any tool that can handle a roughly 10 MB text file.

## Verify the dataset

The test suite protects the digit count, numeric format, known prefix, and SHA-256 checksum:

```sh
python3 -m unittest discover -s tests -v
```

## License

See [LICENSE](LICENSE) for usage and redistribution terms.
