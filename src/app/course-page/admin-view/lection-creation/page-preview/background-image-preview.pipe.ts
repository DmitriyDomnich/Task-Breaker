import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundImagePreview',
})
export class BackgroundImagePreviewPipe implements PipeTransform {
  transform(value: any): string {
    if (!value?.image && !value?.icon) {
      return `url(assets/images/no-link-preview.jpg)`;
    }
    return `url(${value.image.url ?? value.icon.url})`;
  }
}
