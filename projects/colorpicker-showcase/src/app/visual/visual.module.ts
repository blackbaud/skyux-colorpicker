import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkyDocsToolsModule } from '@skyux/docs-tools';

import { SkyColorpickerModule } from 'projects/colorpicker/src/public-api';

import { ColorpickerVisualComponent } from './colorpicker/colorpicker-visual.component';

@NgModule({
  declarations: [
    ColorpickerVisualComponent
  ],
  imports: [
    SkyColorpickerModule,
    SkyDocsToolsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VisualModule { }
