import {
  element,
  by
} from 'protractor';

import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

describe('Colorpicker', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/colorpicker');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should match previous colorpicker screenshot', (done) => {
    expect('#screenshot-colorpicker').toMatchBaselineScreenshot(done, {
      screenshotName: 'colorpicker'
    });
  });

  it('should match previous opened screenshot', (done) => {
    element(by.css('sky-dropdown button')).click();
    expect('#screenshot-colorpicker-opened').toMatchBaselineScreenshot(done, {
      screenshotName: 'colorpicker-opened'
    });
  });
});

describe('Colorpicker (small screens)', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/colorpicker');
    SkyHostBrowser.setWindowBreakpoint('xs');
  });

  it('should match previous colorpicker screenshot', (done) => {
    expect('#screenshot-colorpicker').toMatchBaselineScreenshot(done, {
      screenshotName: 'colorpicker-xs'
    });
  });

  it('should match previous opened screenshot', (done) => {
    element(by.css('sky-dropdown button')).click();
    expect('#screenshot-colorpicker-opened').toMatchBaselineScreenshot(done, {
      screenshotName: 'colorpicker-opened-xs'
    });
  });
});
