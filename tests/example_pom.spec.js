const { test, expect } = require('@playwright/test');
const HomePage = require('../src/pages/home.page');

test('POM: example heading', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto('https://example.com');
  const heading = await home.getHeadingText();
  expect(heading).toContain('Example Domain');
});
