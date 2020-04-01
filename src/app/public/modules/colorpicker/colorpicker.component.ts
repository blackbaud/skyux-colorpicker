import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  Subject
} from 'rxjs';

import {
  SkyColorpickerChangeAxis,
  SkyColorpickerChangeColor,
  SkyColorpickerHsla,
  SkyColorpickerHsva,
  SkyColorpickerMessage,
  SkyColorpickerMessageType,
  SkyColorpickerOutput,
  SkyColorpickerRgba,
  SkyColorpickerResult
} from './types';

import {
 SkyColorpickerService
} from './colorpicker.service';

import {
  SliderPosition,
  SliderDimension
} from './colorpicker-classes';

import {
  SkyAffixAutoFitContext,
  SkyAffixer,
  SkyAffixService,
  SkyOverlayInstance,
  SkyOverlayService
} from '@skyux/core';

let componentIdIndex = 0;

@Component({
  selector: 'sky-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})
export class SkyColorpickerComponent implements OnInit, OnDestroy {

  @Output()
  public selectedColorChanged = new EventEmitter<SkyColorpickerOutput>();

  @Output()
  public selectedColorApplied = new EventEmitter<SkyColorpickerResult>();

  @Input()
  public messageStream = new Subject<SkyColorpickerMessage>();

  @Input()
  public showResetButton = true;

  public idIndex: number;
  public skyColorpickerHexId: string;
  public skyColorpickerRedId: string;
  public skyColorpickerGreenId: string;
  public skyColorpickerBlueId: string;
  public skyColorpickerAlphaId: string;
  public alphaChannel: string;
  public allowTransparency: boolean;
  public alphaSliderColor: string;
  public arrowTop: number;
  public format: number;
  public hexText: string;
  public hslaText: SkyColorpickerHsla;
  public hueSliderColor: string;
  public outputFormat: string;
  public presetColors: Array<string>;
  public returnFormat: string;
  public rgbaText: SkyColorpickerRgba;
  public selectedColor: SkyColorpickerOutput;
  public slider: SliderPosition;
  public initialColor: string;
  public lastAppliedColor: string;
  public isVisible: boolean;

  public backgroundColorForDisplay: string = '#fff';

  public enablePicker: boolean = true;

  public colorpickerId: string;

  public isOpen: boolean = false;

  public triggerButtonId: string;

  @ViewChild('closeColorPicker')
  private closeColorPicker: ElementRef;

  @ViewChild('colorpickerTemplateRef', {
    read: TemplateRef
  })
  private colorpickerTemplateRef: TemplateRef<any>;

  @ViewChild('triggerButtonRef', {
    read: ElementRef
  })
  private triggerButtonRef: ElementRef;

  @ViewChild('colorpickerRef', {
    read: ElementRef
  })
  private set colorpickerRef(value: ElementRef) {
    if (value) {
      this._colorpickerRef = value;
      this.destroyAffixer();
      this.createAffixer();
      this.isVisible = true;
    }
  }

  private get colorpickerRef(): ElementRef {
    return this._colorpickerRef;
  }

  private affixer: SkyAffixer;

  private hsva: SkyColorpickerHsva;

  private ngUnsubscribe = new Subject<void>();

  private overlay: SkyOverlayInstance;

  private sliderDimMax: SliderDimension;

  private _colorpickerRef: ElementRef;

  constructor(
    private affixService: SkyAffixService,
    private colorpickerService: SkyColorpickerService,
    private overlayService: SkyOverlayService
  ) {
    componentIdIndex++;

    this.idIndex = componentIdIndex;
    this.skyColorpickerRedId = 'sky-colorpicker-red-' + this.idIndex;
    this.skyColorpickerHexId = 'sky-colorpicker-hex-' + this.idIndex;
    this.skyColorpickerRedId = 'sky-colorpicker-red-' + this.idIndex;
    this.skyColorpickerGreenId = 'sky-colorpicker-green-' + this.idIndex;
    this.skyColorpickerBlueId = 'sky-colorpicker-blue-' + this.idIndex;
    this.skyColorpickerAlphaId = 'sky-colorpicker-alpha-' + this.idIndex;
    this.colorpickerId = `sky-colorpicker-${this.idIndex}`;
    this.triggerButtonId = `sky-colorpicker-button-${this.idIndex}`;
  }

  @HostListener('document:keydown', ['$event'])
  public keyboardInput(event: any) {
    if (!this.closeColorPicker) {
      return;
    }
    /* Ignores in place for valid code that is only used in IE and Edge */
    /* istanbul ignore next */
    const code: string = event.code || event.key;
    /* istanbul ignore else */
    if (code && code.toLowerCase().indexOf('esc') === 0) {
      this.closeColorPicker.nativeElement.click();
    }
  }

  public setDialog(
    instance: any,
    elementRef: ElementRef,
    color: any,
    outputFormat: string,
    presetColors: Array<string>,
    alphaChannel: string,
    allowTransparency: boolean
  ) {
    this.initialColor = color;
    this.outputFormat = outputFormat;
    this.presetColors = presetColors;
    this.alphaChannel = alphaChannel;
    this.allowTransparency = allowTransparency;

    if (this.outputFormat === 'rgba') {
      this.format = 1;
    } else if (this.outputFormat === 'hsla') {
      this.format = 2;
    } else {
      this.format = 0;
    }
  }

  public ngOnInit() {
    this.sliderDimMax = new SliderDimension(182, 270, 170, 182);
    this.slider = new SliderPosition(0, 0, 0, 0);
    this.messageStream
      .takeUntil(this.ngUnsubscribe)
      .subscribe((message: SkyColorpickerMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngOnDestroy(): void {
    this.destroyAffixer();
    this.destroyOverlay();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe = undefined;
  }

  public onButtonClick(): void {
    this.sendMessage(SkyColorpickerMessageType.Open);
  }

  public openPicker(): void {
    if (!this.enablePicker) {
      return;
    }

    this.isVisible = false;
    this.destroyOverlay();
    this.createOverlay();
    this.isOpen = true;
  }

  public closePicker(): void {
    this.setColorFromString(this.lastAppliedColor);
    this.destroyAffixer();
    this.destroyOverlay();
    this.isOpen = false;
  }

  public resetPickerColor() {
    this.sendMessage(SkyColorpickerMessageType.Reset);
  }

  public applyColor(): void {
    this.selectedColorChanged.emit(this.selectedColor);
    this.selectedColorApplied.emit({ color: this.selectedColor });
    this.lastAppliedColor = this.selectedColor.rgbaText;
    this.destroyOverlay();
  }

  public setColorFromString(value: string) {
    let hsva: SkyColorpickerHsva;

    if (this.alphaChannel === 'hex8') {
      hsva = this.colorpickerService.stringToHsva(value, true);
      if (!hsva && !this.hsva) {
        hsva = this.colorpickerService.stringToHsva(value, false);
      }

    } else {
      hsva = this.colorpickerService.stringToHsva(value, false);
    }

    if (hsva) {
      this.hsva = hsva;
      this.update();
    }
  }

  public set hue(change: SkyColorpickerChangeAxis) {
    this.hsva.hue = change.xCoordinate / change.maxRange;
    this.update();
  }

  public set red(change: SkyColorpickerChangeColor) {
    let rgba = this.colorpickerService.hsvaToRgba(this.hsva);
    rgba.red = change.colorValue / change.maxRange;
    this.hsva = this.colorpickerService.rgbaToHsva(rgba);
    this.update();
  }

  public set green(change: SkyColorpickerChangeColor) {
    let rgba = this.colorpickerService.hsvaToRgba(this.hsva);
    rgba.green = change.colorValue / change.maxRange;
    this.hsva = this.colorpickerService.rgbaToHsva(rgba);
    this.update();
  }

  public set blue(change: SkyColorpickerChangeColor) {
    let rgba = this.colorpickerService.hsvaToRgba(this.hsva);
    rgba.blue = change.colorValue / change.maxRange;
    this.hsva = this.colorpickerService.rgbaToHsva(rgba);
    this.update();
  }

  public set alphaAxis(change: SkyColorpickerChangeAxis) {
    this.hsva.alpha = change.xCoordinate / change.maxRange;
    this.update();
  }

  public set alphaColor(change: SkyColorpickerChangeColor) {
    this.hsva.alpha = change.colorValue / change.maxRange;
    this.update();
  }

  public set hex(change: SkyColorpickerChangeColor) {
    this.setColorFromString(change.color);
  }

  public set saturationAndLightness(value: SkyColorpickerChangeAxis) {
    this.hsva.saturation = value.xCoordinate / value.xAxis;
    this.hsva.value = value.yCoordinate / value.yAxis;
    this.update();
  }

  public update() {
    let hsla: SkyColorpickerHsla = this.colorpickerService.hsva2hsla(this.hsva);
    let dHsla: SkyColorpickerHsla = this.colorpickerService.denormalizeHSLA(hsla);
    let rgba: SkyColorpickerRgba = this.colorpickerService.hsvaToRgba(this.hsva);
    let dRgba: SkyColorpickerRgba = this.colorpickerService.denormalizeRGBA(rgba);

    let hsva: SkyColorpickerHsva = {
      'hue': this.hsva.hue,
      'saturation': 1,
      'value': 1,
      'alpha': 1
    };

    let hueRgba = this.colorpickerService.denormalizeRGBA(
      this.colorpickerService.hsvaToRgba(hsva)
    );

    this.hslaText = dHsla;
    this.rgbaText = dRgba;
    this.hexText = this.colorpickerService.hexText(dRgba, this.alphaChannel === 'hex8');

    this.alphaSliderColor = `rgba(${dRgba.red},${dRgba.green},${dRgba.blue},${dRgba.alpha})`;
    this.hueSliderColor = `rgba(${hueRgba.red},${hueRgba.green},${hueRgba.blue},${rgba.alpha})`;

    if (this.format === 0 && this.hsva.alpha < 1 && this.alphaChannel === 'hex6') {
      this.format++;
    }

    this.colorpickerService.outputFormat(
      this.hsva,
      this.outputFormat,
      this.alphaChannel === 'hex8'
    );

    this.selectedColor = this.colorpickerService.skyColorpickerOut(this.hsva);

    this.slider = new SliderPosition(
      (this.hsva.hue) * this.sliderDimMax.hue - 8,
      this.hsva.saturation * this.sliderDimMax.saturation - 8,
      (1 - this.hsva.value) * this.sliderDimMax.value - 8,
      this.hsva.alpha * this.sliderDimMax.alpha - 8
    );

    this.backgroundColorForDisplay = this.selectedColor.rgbaText;
  }

  private sendMessage(type: SkyColorpickerMessageType) {
    this.messageStream.next({ type });
  }

  private handleIncomingMessages(message: SkyColorpickerMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyColorpickerMessageType.Open:
        this.openPicker();
        break;

      case SkyColorpickerMessageType.Close:
        this.closePicker();
        break;

      case SkyColorpickerMessageType.Reset:
        this.setColorFromString(this.initialColor);
        this.selectedColorChanged.emit(this.selectedColor);
        this.selectedColorApplied.emit({ color: this.selectedColor });
        break;

      case SkyColorpickerMessageType.ToggleResetButton:
        this.showResetButton = !this.showResetButton;
        break;
    }
  }

  private createAffixer(): void {
    const affixer = this.affixService.createAffixer(this.colorpickerRef);

    affixer.placementChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((change) => {
        this.isVisible = (change.placement !== null);
      });

    affixer.affixTo(this.triggerButtonRef.nativeElement, {
      autoFitContext: SkyAffixAutoFitContext.Viewport,
      enableAutoFit: true,
      horizontalAlignment: 'left',
      isSticky: true,
      placement: 'below'
    });

    this.affixer = affixer;
  }

  private destroyAffixer(): void {
    /*istanbul ignore else*/
    if (this.affixer) {
      this.affixer.destroy();
      this.affixer = undefined;
    }
  }

  private createOverlay(): void {
    const overlay = this.overlayService.create({
      enableScroll: true,
      enablePointerEvents: false
    });

    overlay.attachTemplate(this.colorpickerTemplateRef);

    this.overlay = overlay;
  }

  private destroyOverlay(): void {
    /*istanbul ignore else*/
    if (this.overlay) {
      this.overlayService.close(this.overlay);
      this.overlay = undefined;
    }
  }
}
