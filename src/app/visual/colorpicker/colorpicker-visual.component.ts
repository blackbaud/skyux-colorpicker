import {
  Component, OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'colorpicker-visual',
  templateUrl: './colorpicker-visual.component.html'
})
export class SkyColorpickerDemoComponent implements OnInit {

  public textGroup: FormGroup;

  public colorGroup: FormGroup;

  public textGroupUpdateCount = 0;

  public colorGroupUpdateCount = 0;

  private textGroupUpdateClickCount = 0;

  private colorGroupUpdateClickCount = 0;

  private textGroupValues = [
    {
      text1: 'a',
      text2: 'b',
      text3: 'c',
      text4: 'd',
      text5: 'e'
    },
    {
      text1: 'z',
      text2: 'y',
      text3: 'x',
      text4: 'w',
      text5: 'v'
    }
  ];

  private colorGroupValues = [
    {
      color1: '#000',
      color2: '#111',
      color3: '#222',
      color4: '#333',
      color5: '#444'
    },
    {
      color1: '#fff',
      color2: '#eee',
      color3: '#ddd',
      color4: '#ccc',
      color5: '#bbb'
    }
  ];

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit() {
    this.textGroup = this.formBuilder.group(this.textGroupValues[0]);

    this.colorGroup = this.formBuilder.group(this.colorGroupValues[0]);

    this.textGroup.valueChanges.subscribe(() => this.textGroupUpdateCount++);

    this.colorGroup.valueChanges.subscribe((event) => {
      console.log(event);
      this.colorGroupUpdateCount++;
    });
  }

  public colorGroupUpdate() {
    this.colorGroupUpdateClickCount++;
    this.colorGroup.setValue(this.colorGroupValues[this.colorGroupUpdateClickCount % 2]);
  }

  public textGroupUpdate() {
    this.textGroupUpdateClickCount++;
    this.textGroup.setValue(this.textGroupValues[this.textGroupUpdateClickCount % 2]);
  }

}
