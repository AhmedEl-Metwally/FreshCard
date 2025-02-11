import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: [
      '<span class="p-2 bg-primary-500/80 hover:bg-primary-600 text-white rounded-full px-4 py-2">‹</span>',
      '<span class="p-2 bg-primary-500/80 hover:bg-primary-600 text-white rounded-full px-4 py-2">›</span>'
    ],
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1024: { items: 1 }
    },
    nav: true,
    dotsEach: true
  }

}
