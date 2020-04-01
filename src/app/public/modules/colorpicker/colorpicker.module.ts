import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyAffixModule,
  SkyOverlayModule
} from '@skyux/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyColorpickerResourcesModule
} from '../shared/colorpicker-resources.module';

import {
  SkyColorpickerInputDirective
} from './colorpicker-input.directive';

import {
  SkyColorpickerSliderDirective
} from './colorpicker-slider.directive';

import {
  SkyColorpickerTextDirective
} from './colorpicker-text.directive';

import {
  SkyColorpickerComponent
} from './colorpicker.component';

import {
  SkyColorpickerService
} from './colorpicker.service';

@NgModule({
  declarations: [
    SkyColorpickerComponent,
    SkyColorpickerInputDirective,
    SkyColorpickerSliderDirective,
    SkyColorpickerTextDirective
  ],
  imports: [
    CommonModule,
    SkyAffixModule,
    SkyColorpickerResourcesModule,
    SkyI18nModule,
    SkyOverlayModule
  ],
  exports: [
    SkyColorpickerComponent,
    SkyColorpickerInputDirective
  ],
  providers: [
    SkyColorpickerService
  ]
})
export class SkyColorpickerModule { }
