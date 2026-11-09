import { useEffect, useState } from "react";
import { Shell, asset, type ViewProps } from "./shared";
export default function Controller({ Page, css, title }: ViewProps) {
  const [digits, setDigits] = useState("Loading...");
  useEffect(() => {
    const c = new AbortController();
    fetch(asset("Pi.txt"), { signal: c.signal })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.text();
      })
      .then((t) => setDigits("3." + t))
      .catch(() => {
        if (!c.signal.aborted) setDigits("Could not load Pi digits.");
      });
    return () => c.abort();
  }, []);
  return (
    <Shell css={css} title={title}>
      <Page
        slots={{
          "pi-content": (
            <div id="pi-content" aria-live="polite">
              {digits}
            </div>
          ),
        }}
      />
    </Shell>
  );
}
