# Playwright Test Fixtures (Layman-friendly list)

Playwright injects a set of handy objects (fixtures) into your test function. You can pick the ones you need by destructuring the single fixtures object.

Common fixtures and short examples

- `page`
  - What: a browser tab (the page you interact with).
  - Use: navigating, clicking, typing, assertions.
  - Example:
    ```javascript
    test('has title', async ({ page }) => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle(/Example/);
    });
    ```

- `context`
  - What: a browser context (isolated cookies/cache). Useful for multi-page or multi-user scenarios.
  - Example:
    ```javascript
    test('context pages', async ({ context }) => {
      const pages = context.pages();
    });
    ```

- `browser`
  - What: the Browser instance (lower-level). Usually used for advanced scenarios like launching new contexts.
  - Example:
    ```javascript
    test('new context', async ({ browser }) => {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
    });
    ```

- `request`
  - What: an API request helper for making network calls outside the browser UI.
  - Example:
    ```javascript
    test('api call', async ({ request }) => {
      const resp = await request.get('https://api.example.com/health');
      expect(resp.ok()).toBeTruthy();
    });
    ```

- `testInfo`
  - What: metadata about the running test (name, retry count, output path, attachments).
  - Example:
    ```javascript
    test('log test name', async ({ page, testInfo }) => {
      console.log('Running test:', testInfo.title);
    });
    ```

- `browserName`
  - What: string name of the browser used in this worker (e.g., `'chromium'`, `'webkit'`).
  - Example:
    ```javascript
    test('check browser', async ({ browserName }) => {
      console.log(browserName);
    });
    ```

- `workerIndex`
  - What: number of the worker process running the test (useful for parallelism-aware resources).
  - Example:
    ```javascript
    test('worker', async ({ workerIndex }) => {
      console.log('worker:', workerIndex);
    });
    ```

- `playwright`
  - What: the Playwright library namespace (gives low-level access to browser types and launch options). Useful for advanced scenarios where you need to launch browsers or access Playwright APIs directly.
  - Example:
    ```javascript
    test('use playwright', async ({ playwright }) => {
      const chromium = playwright.chromium;
      const browser = await chromium.launch();
      await browser.close();
    });
    ```

Other related test options / features
- `video`, `trace`, `screenshot`, `storageState`
  - What: these are test run features or artifacts rather than fixtures you destructure directly. They are usually enabled or configured in `playwright.config.js` (for example, to record video or trace for a test).
  - Note: Some helpers or plugins may expose additional fixtures (for example a `video` object or helper fixture). Check your Playwright configuration or plugins to see what is available in your project.

Notes
- The exact set of available fixtures can depend on your Playwright configuration or plugins.
- You can add custom fixtures with `test.extend()` if you need to inject your own helpers.

This document lists the most commonly used fixtures you will see in typical Playwright Test setups. If you want the exact fixtures available for your installed Playwright version and project config, I can look them up and add a precise list.

If you'd like, I can add a small example showing a custom fixture or include less-common fixtures like `video` / `trace` and how to enable them.