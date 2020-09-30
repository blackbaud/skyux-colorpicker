import { SkyColorpickerOutput } from './colorpicker-output';
/**
 * Specifies the selected color.
 */
export interface SkyColorpickerResult {
  /**
   * Emits an object that describes the color that users select in the colorpicker.
   */
  color: SkyColorpickerOutput;
}
