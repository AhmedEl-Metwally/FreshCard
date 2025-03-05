import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  imports: [CarouselModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

   _categoriesService = inject(CategoriesService)
  
  categories!: Category[]
  
  ngOnInit(): void {
    this.getCategories()
  }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      nav: false,
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
  }

  getCategories() {
    this._categoriesService.getAllCategoreis().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
