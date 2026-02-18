const base = require('@playwright/test');


const test = base.test.extend({
  // Define fixtures here if needed

  sharedbrowser:[async({playwright},use)=>{
    // Launch a browser instance
    const sharedBrowser = await playwright.chromium.launch();
    // Use the browser instance in the tests
    await use(sharedBrowser);
    // Teardown: close the browser instance after tests are done
    await sharedBrowser.close();
  }, { scope: 'worker' }],
});

module.exports = {
  test,
  expect: base.expect,
};