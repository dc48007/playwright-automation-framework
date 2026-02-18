# Playwright `test` callback (plain explanation)

What is the "test callback"?

- The test callback is the function you hand to `test(...)` in Playwright. Playwright runs that function as the actual test.
- Think of `test('name', callback)` like saying: "Hey test runner, please run this `callback` now and treat it as a test named `name`."

Why it matters (in simple terms)

- The callback is where you write the steps you want the browser to perform (navigate, click, type) and where you assert expected outcomes using `expect`.
- Playwright controls the setup and teardown (opening/closing browser pages) and injects helpful objects (called fixtures) into the callback so you don't have to set them up manually.

Signature (typical forms)

- Basic:

```js
test('my test', async ({ page }) => {
  // test steps using the page fixture
});
```

- With test info:

```js
test('my test', async ({ page }, testInfo) => {
  // testInfo contains runtime info like title, project, retry
});
```

- With options (timeout, etc.):

```js
test('my test', { timeout: 10000 }, async ({ page }) => {
  // custom timeout for this test
});
```

What the pieces mean (plain language)

- `test('my test', ...)` — the first argument `'my test'` is just the test name (a string). It shows in reports and is used to filter tests.
- `async ({ page }, testInfo) => { ... }` — the callback:
  - `{ page }` is destructuring of fixtures Playwright provides. `page` is a browser tab/page ready to use.
  - `testInfo` (optional second arg) gives metadata and helper methods (e.g., to attach screenshots to reports).
  - `async` allows you to `await` Playwright actions (navigation, clicks, etc.).

Where fixtures come from

- Playwright defines a set of built-in fixtures (`page`, `browser`, `context`, `request`, etc.). The runner injects them into your callback based on the names you request.
- You can also add custom fixtures in `playwright.config.js` or via `test.extend()`.

Examples (annotated)

```js
const { test, expect } = require('@playwright/test');

// A simple test: Playwright opens a page for us and passes it in
test('homepage title', async ({ page }) => {
  // page is provided by Playwright as a ready-to-use browser tab
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

// Using testInfo to attach metadata or logs
test('example with testInfo', async ({ page }, testInfo) => {
  await page.goto('https://example.com');
  // testInfo.title contains the test name
  console.log('Running test:', testInfo.title);
});
```

Tips

- Only request the fixtures you need — Playwright will provide them.
- Use `testInfo` to add attachments (screenshots) or access retry info.
- Tests should throw an error or use `expect` failures to mark them as failed; otherwise they pass.

Where to put this code

- In your test files (e.g., `tests/*.spec.js`). The Playwright runner will discover and run them.

