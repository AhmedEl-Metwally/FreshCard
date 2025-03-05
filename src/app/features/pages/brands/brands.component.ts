import { Brand } from './../../../shared/interfaces/order';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/Brand/brand.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly _brandService = inject(BrandService)

  Brand!: Brand[]

  
  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(): void {
    this._brandService.getAllBrands().subscribe
      ({
      next: (res) => {
        console.log( res); 
        this.Brand = res.data;
      },
      error: (err) => console.error( err),
      complete: () => console.log('omplete'),
    });
  }

  trackById(index: number, brand: Brand): string
  {
    return brand._id;
  }


}
