import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';

@Component({
  selector: 'image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent implements OnInit {
  croppedImage: any;

  transform: ImageTransform = {
    // scale: 2,
  };

  @ViewChild('y', {
    read: ElementRef,
  })
  ySlider: ElementRef<HTMLElement>;
  @ViewChild('x', {
    read: ElementRef,
  })
  xSlider: ElementRef<HTMLElement>;
  @ViewChild(ImageCropperComponent, {
    read: ElementRef,
  })
  imgCrop: ElementRef<HTMLElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public inputEvent: InputEvent) {}

  ngOnInit(): void {}

  onCropperReady({ height }: Dimensions) {
    this.ySlider.nativeElement.style.height = height / 2 + 'px';
    const ySliderHeight = parseInt(this.ySlider.nativeElement.style.height) / 2;

    this.ySlider.nativeElement.style.top = height / 2 - ySliderHeight + 'px';

    this.xSlider.nativeElement.style.top = height + 5 + 'px';
  }
  onScaleSlideChange(slideChangeEvent: MatSliderChange) {
    this.transform = {
      ...this.transform,
      scale: slideChangeEvent.value!,
    };
  }
  onXPositionSlideChange(slideChangeEvent: MatSliderChange) {
    this.transform = {
      ...this.transform,
      translateH: ~slideChangeEvent.value!,
    };
  }
  onYPositionSlideChange(slideChangeEvent: MatSliderChange) {
    this.transform = {
      ...this.transform,
      translateV: slideChangeEvent.value!,
    };
  }
  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
