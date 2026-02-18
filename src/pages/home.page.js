const BasePage = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = 'h1';
  }

  async goto(url = '/') {
    await super.goto(url);
  }

  async getHeadingText() {
    return this.page.textContent(this.heading);
  }
}

module.exports = HomePage;
