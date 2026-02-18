const { test, expect } = require('@playwright/test');

test('example: navigate and check title',{tag:'@smoke'},  async ({ page }) => {
 
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
test('duplicate',{tag:'@smoke'},  async ({ page }) => {
 
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

