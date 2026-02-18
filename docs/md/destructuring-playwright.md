# Destructuring in Playwright (Layman's terms)

Playwright's test runner calls your test with a single object that contains useful things (called "fixtures") like `page`, `context`, and `request`.

Destructuring is a JavaScript shortcut that pulls just the properties you want from that object so you can use them directly.

Why use it
- Shorter code: you don't have to write `fixtures.page`.
- Focused: you only list the fixtures you need for that test.

What it looks like

Destructured (preferred in Playwright tests):

```javascript
test('visit site', async ({ page }) => {
  await page.goto('https://example.com');
});
```

Equivalent without destructuring:

```javascript
test('visit site', async (fixtures) => {
  const page = fixtures.page;
  await page.goto('https://example.com');
});
```

Other quick patterns
- Multiple fixtures: `async ({ page, context }) => { ... }`
- Rename while extracting: `async ({ page: p }) => { await p.goto('...') }`
- Capture remaining fixtures: `async ({ page, ...rest }) => { /* rest has others */ }`

In short: destructuring is just a clean way to pick the Playwright tools you need from the single object the runner gives your test.