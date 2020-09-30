import {
  Component
} from '@angular/core';

import {
  SkyColorpickerOutput
} from '@skyux/colorpicker';

@Component({
  selector: 'app-colorpicker-demo',
  templateUrl: './colorpicker-demo.component.html'
})
export class ColorpickerDemoComponent {

  public model: any = {
    favoriteColor: 'rgb(0, 0, 225)'
  };

  public swatches: string[] = [
    '#BD4040',
    '#617FC2',
    '#60AC68',
    '#3486BA',
    '#E87134',
    '#DA9C9C'
  ];

  public onSelectedColorChanged(args: SkyColorpickerOutput): void {
    console.log('Template-driven form color changed:', args);
  }

  public submit(formData: any): void {
    alert('Your favorite color is: \n' + formData.favoriteColor.hex);
  }
}
