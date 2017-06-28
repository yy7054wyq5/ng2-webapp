import { Ng2CliDemoPage } from './app.po';

describe('ng2-cli-demo App', function() {
  let page: Ng2CliDemoPage;

  beforeEach(() => {
    page = new Ng2CliDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
