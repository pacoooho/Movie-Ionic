import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
const imgPath = environment.imgPath;

@Pipe({
  name: 'imagen'
})
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

export class ImagenPipe implements PipeTransform {
  transform(img: string, size: string = "w500"): string {
    if (!img) {
      return './assets/no-image-banner.jpg';
    }
    const imgUrl = `${imgPath}/${size}${img}`;
    return imgUrl;
  }

}
