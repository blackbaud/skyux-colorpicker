import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorpickerVisualComponent } from './visual/colorpicker/colorpicker-visual.component';

const routes: Routes = [
  {
    path: 'visual/colorpicker',
    component: ColorpickerVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
