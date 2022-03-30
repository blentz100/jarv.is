import { query, storageKey, classNames } from "../../lib/styles/helpers/themes";

// comments are up here to avoid having them inside the actual client output:
//  - `p` is the user's saved preference
//  - `cn` is the map of theme -> classname
//  - `cl` is the list of <html>'s current class(es), which the `cn` values are removed to start fresh
//  - `q` is always the CSS media query for prefers dark mode
//  - `m` is the listener which tests that media query
//  - `try/catch` is in case I messed something up here bigly... (will default to light theme)
/* eslint-disable no-empty, no-var, one-var */
const clientScript = () => {
  try {
    var p = localStorage.getItem("__STORAGE_KEY__"),
      cn = "__CLASS_NAMES__",
      cl = document.documentElement.classList;
    cl.remove("__LIST_OF_CLASSES__");

    if (!p || p === "system") {
      var q = "__MEDIA_QUERY__",
        m = window.matchMedia(q);
      m.media !== q || m.matches ? cl.add(cn["dark"]) : cl.add(cn["light"]);
    } else if (p) {
      cl.add(cn[p]);
    }
  } catch (e) {}
};
/* eslint-enable no-empty, no-var, one-var */

// since the function above will end up being injected as a plain dumb string, we need to set the dynamic values here:
const prepareScript = (script: unknown) => {
  const functionString = String(script)
    .replace('"__MEDIA_QUERY__"', `"${query}"`)
    .replace('"__STORAGE_KEY__"', `"${storageKey}"`)
    .replace('"__CLASS_NAMES__"', JSON.stringify(classNames))
    .replace(
      '"__LIST_OF_CLASSES__"',
      Object.values(classNames)
        .map((t: string) => `"${t}"`)
        .join(",")
    )
    // somewhat "minify" the final code by removing tabs/newlines:
    // https://github.com/sindresorhus/condense-whitespace/blob/main/index.js
    .replace(/\s{2,}/gu, "")
    .trim();

  // make it an IIFE:
  return `(${functionString})()`;
};

// the script tag injected manually into `<head>` in _document.tsx.
// even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
// white on load. injecting a normal script tag lets us prioritize setting `<html>` attributes even more.
const ThemeScript = () => (
  <script
    key="restore-theme"
    dangerouslySetInnerHTML={{
      __html: prepareScript(clientScript),
    }}
  />
);

export default ThemeScript;
