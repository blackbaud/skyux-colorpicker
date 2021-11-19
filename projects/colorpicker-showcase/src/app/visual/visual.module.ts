import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';

import { SkyColorpickerModule } from 'projects/colorpicker/src/public-api';

import { ColorpickerVisualComponent } from './colorpicker/colorpicker-visual.component';
import { VisualComponent } from './visual.component';

@NgModule({
  declarations: [ColorpickerVisualComponent, VisualComponent],
  imports: [
    SkyColorpickerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SkyE2eThemeSelectorModule,
  ],
})
export class VisualModule {}
