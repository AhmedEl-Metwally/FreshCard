import { Category } from './../../../../../shared/interfaces/category';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {


   _categoriesService = inject(CategoriesService)

  categories!: Category[]
  

  // handleImageError(event: Event) {
  //   const img = event.target as HTMLImageElement;
  //   img.src = 'assets/images/fallback.jpg';
  //   img.style.objectFit = 'contain';
  // }

  // getResponsiveSources(image: string): string {
  //   return `${image}-480w 480w,
  //         ${image}-800w 800w,
  //         ${image}-1200w 1200w`;
  // }

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
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 }
    },
    nav: true,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>'
    ]
  }

  ngOnInit(): void {
      this.getCategories()
  }




  getCategories()
{
    this._categoriesService.getAllCategoreis().subscribe({
      next:(res) =>{
        console.log(res.data);
        this.categories = res.data
      },
      error: (err) => {
        console.log(err);
        
      }
  })
}

}


