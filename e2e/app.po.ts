export class Ng2CliDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2-cli-demo-app h1')).getText();
  }
}
