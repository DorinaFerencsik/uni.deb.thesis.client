import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'img[fallback]',
    // host: {
    //   '(error)':'updateUrl()',
    //   '(load)': 'load()',
    //   '[src]':'src'
    //  }
  })
 export class ImageFallbackDirective {
  @HostBinding('src')
  @Input() src: string;
  @Input() fallback: string;
  @HostBinding('class') className;

  @HostListener('error')
  updateUrl() {
    this.src = this.fallback;
  }

  @HostListener('load')
  load(){
    this.className = 'image-loaded';
  }
}
