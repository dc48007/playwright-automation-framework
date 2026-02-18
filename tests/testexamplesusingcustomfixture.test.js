import { test, expect } from '../src/fixtures/basefixture.js';

test('example: navigate and check title',{tag:'@smoke'},  async ({ sharedbrowser }) => {

    const context = await sharedbrowser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
  context.close();
});

test('example: navigate to example domain', {tag:'@smoke'}, async ({ sharedbrowser }) => {

    const context = await sharedbrowser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
  context.close();
});