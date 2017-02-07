import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2CliDemoAppComponent } from '../app/ng2-cli-demo.component';

beforeEachProviders(() => [Ng2CliDemoAppComponent]);

describe('App: Ng2CliDemo', () => {
  it('should create the app',
      inject([Ng2CliDemoAppComponent], (app: Ng2CliDemoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2-cli-demo works!\'',
      inject([Ng2CliDemoAppComponent], (app: Ng2CliDemoAppComponent) => {
    expect(app.title).toEqual('ng2-cli-demo works!');
  }));
});
