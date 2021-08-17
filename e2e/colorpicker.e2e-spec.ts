import {
  by,
  element
} from 'protractor';

import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

describe('Colorpicker', () => {

  //#region helpers
  let browserSize: SkyHostBrowserBreakpoint;
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  async function setBrowserSize(size: SkyHostBrowserBreakpoint): Promise<void> {
    browserSize = size;

    return SkyHostBrowser.setWindowBreakpoint(size);
  }

  function getScreenshotName(name: string): string {
    if (browserSize) {
      name += '-' + browserSize;
    }

    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  async function validateColorpicker(done: DoneFn): Promise<void> {
    expect('#screenshot-colorpicker').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('colorpicker')
    });
  }

  async function validateColorpickerOpened(done: DoneFn): Promise<void> {
    element(by.css('.sky-colorpicker-button')).click();
    expect('.sky-colorpicker-container').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('colorpicker-opened')
    });
  }

  async function validateColorpickerDisabled(done: DoneFn): Promise<void> {
    expect('#screenshot-colorpicker3').toMatchBaselineScreenshot(done, {
      screenshotName: getScreenshotName('colorpicker-disabled')
    });
  }

  function runTests(): void {
    it('should match previous colorpicker screenshot', (done) => {
      validateColorpicker(done);
    });

    it('should match previous opened screenshot', (done) => {
      validateColorpickerOpened(done);
    });

    it('should match previous disabled screenshot', (done) => {
      validateColorpickerDisabled(done);
    });
  }
  //#endregion

  describe('(size: lg)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/colorpicker');
      await setBrowserSize('lg');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });

  describe('(size: xs)', () => {
    beforeEach( async() => {
      currentTheme = undefined;
      currentThemeMode = undefined;
      await SkyHostBrowser.get('visual/colorpicker');
      await setBrowserSize('xs');
    });

    runTests();

    describe('when modern theme', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'light');
      });

      runTests();
    });

    describe('when modern theme in dark mode', () => {
      beforeEach(async () => {
        await selectTheme('modern', 'dark');
      });

      runTests();
    });
  });
});
