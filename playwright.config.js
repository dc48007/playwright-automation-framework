const { devices } = require('@playwright/test');

module.exports = {
  //globalSetup: require.resolve('./global-setup.js'),
 // globalTeardown: require.resolve('./global-teardown.js'),
  testDir: 'tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
};
