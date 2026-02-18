# What `require('@playwright/test')` and `const { test, expect } = ...` mean (layman)

Simple summary

- `require('@playwright/test')` loads the Playwright test library into your file. Think of it as "bringing the Playwright toolbox into this script." 
- `const { test, expect } = require('@playwright/test')` pulls two specific tools out of that toolbox and gives them short names you can use directly: `test` (to define tests) and `expect` (to make assertions).

Why this is done

- The Playwright package exports a bunch of helpers (an object with many properties). Instead of typing the full object every time, we extract the exact helpers we need and use them directly.
- This makes test files short and readable.

What each piece is, in plain words

- `require('...')` — loads a module (package or file). It returns whatever that module provides (often an object).
- `{ test, expect } = ...` — "destructuring" syntax: take the `test` and `expect` properties from the object and store them as variables.
- `test` — a function to declare a test case. The test runner (when you run `npx playwright test`) runs these functions and provides browser/page objects to them.
- `expect` — a set of assertion helpers (like `toHaveTitle`, `toHaveText`, `toBe`) used inside tests to check results.

Concrete example (copy into `tests/example.spec.js`)

```js
const { test, expect } = require('@playwright/test');

test('example page title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

How to know what else you can use

- Read the Playwright docs or the package exports. To inspect available names quickly, run in your terminal:

```powershell
node -e "console.log(Object.keys(require('@playwright/test')))"
```

That lists all top-level helpers exported by the package (you can pick any of them with destructuring). Example names you might see: `test`, `expect`, `devices`, `chromium`, `webkit`, `describe`, `beforeEach`, etc.

If a module doesn't export an object

- Some modules export a single function or class (not an object). In that case `require(...)` returns that function, and you cannot destructure properties from it.

Alternative (no destructuring)

```js
const pw = require('@playwright/test');
const test = pw.test;
const expect = pw.expect;
```

Where to put this

- In test files (e.g., `tests/*.spec.js`). Also OK in config, fixtures, or helper files.

Quick tip

- If you use modern ES modules (`import`), the syntax is similar:

```js
import { test, expect } from '@playwright/test';
```

---
File created: docs/md/require-explainer.md
