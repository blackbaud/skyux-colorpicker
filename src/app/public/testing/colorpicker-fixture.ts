import {
  ComponentFixture
} from '@angular/core/testing';

import {
  DebugElement
} from '@angular/core';

import {
  By
} from '@angular/platform-browser';

import {
  SkyAppTestUtility
} from '@skyux-sdk/testing';

/**
 * Allows interaction with a SKY UX colorpicker component.
 */
export class SkyColorpickerFixture {

  private debugEl: DebugElement;

  constructor(
    private fixture: ComponentFixture<any>,
    private skyTestId: string
  ) {
    this.debugEl = SkyAppTestUtility.getDebugElementByTestId(this.fixture, this.skyTestId, 'sky-colorpicker');
  }

  /**
   * The colorpicker's currently selected color formatted to the `outputFormat`.
   */
  public get value(): string {
    return this.getColorpickerInputEl().nativeElement.value;
  }

  /**
   * Set the colorpicker's color hex code.
   * @param hexValue The new color hex code. Must inculde '#'.
   */
  public async setColorFromHexValue(hexValue: string): Promise<any> {
    await this.clickColorpickerButtonEl();

    const hexInput = document.querySelector('input[id^=sky-colorpicker-hex-]') as HTMLInputElement;

    hexInput.value = hexValue;
    SkyAppTestUtility.fireDomEvent(hexInput, 'input');

    await this.clickColorpickerApplyButtonEl();

    return this.fixture.whenStable();
  }

  /**
   * Set the colorpicker's color RGB values.
   * @param r The red color value.
   * @param g The green color value.
   * @param b The blue color value.
   */
  public async setColorFromRGBValue(r: number, g: number, b: number): Promise<any> {
    await this.clickColorpickerButtonEl();

    const rInput = document.querySelector('input[id^=sky-colorpicker-red-]') as HTMLInputElement;
    const gInput = document.querySelector('input[id^=sky-colorpicker-green-]') as HTMLInputElement;
    const bInput = document.querySelector('input[id^=sky-colorpicker-blue-]') as HTMLInputElement;

    rInput.value = r.toString();
    gInput.value = g.toString();
    bInput.value = b.toString();

    SkyAppTestUtility.fireDomEvent(rInput, 'input');
    SkyAppTestUtility.fireDomEvent(gInput, 'input');
    SkyAppTestUtility.fireDomEvent(bInput, 'input');

    await this.clickColorpickerApplyButtonEl();

    return this.fixture.whenStable();
  }

  /**
   * Set the colorpicker's color to the provided preset color at the given index.
   * @param presetIndex The index of the color in the `presetColors` list to select.
   */
  public async setColorFromPresets(presetIndex: number): Promise<any> {
    await this.clickColorpickerButtonEl();

    const presetColors = document.querySelectorAll('.sky-preset-color');
    const presetColor = presetColors && presetColors[presetIndex] as HTMLButtonElement;

    if (presetColor) {
      console.log('le color');
      console.log(presetColor);
      presetColor.click();
      this.fixture.detectChanges();
    }

    await this.clickColorpickerApplyButtonEl();

    return this.fixture.whenStable();
  }

  private async clickColorpickerButtonEl(): Promise<any> {
    const colorpickerButton = this.debugEl.query(
      By.css('sky-colorpicker button')
    ).nativeElement;

    colorpickerButton.click();

    this.fixture.detectChanges();

    return this.fixture.whenStable();
  }

  private async clickColorpickerApplyButtonEl(): Promise<any> {
    const applyButton = document.querySelector('.sky-btn-colorpicker-apply') as HTMLButtonElement;

    applyButton.click();

    this.fixture.detectChanges();

    return this.fixture.whenStable();
  }

  private getColorpickerInputEl(): DebugElement {
    return this.debugEl.query(
      By.css('sky-colorpicker input')
    );
  }
}
